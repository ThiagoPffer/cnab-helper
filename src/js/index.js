const CNAB_TEMPLATES = {
    341: {
        400: {
            ret: { templ: itau400retTemplate, segFind: getCurrentSegment },
            rem: null
        },
        240: null
    }
}

const SELECTION_OPTIONS = { bank: null, cnab: null, file: null };
const PREVENT_KEYS = ['Enter', 'ArrowDown', 'ArrowUp'];
const KEY_FUNCTIONS = {
    'ArrowDown': () => {},
    'ArrowUp': () => {}
};
let SELECTED_TEMPLATE = null;
let SEGMENT_FINDER_FUNCTION = null;

let CARET_POSITION = 0;

const CNAB_BUTTONS = document.querySelectorAll('.cnab-button');
const FILE_BUTTONS = document.querySelectorAll('.file-button');
const SELECTION_LABELS = document.querySelectorAll('.selection-label');

const BANK_SECTION = document.getElementById('bank-selection');
const CNAB_SECTION = document.getElementById('cnab-selection');
const FILE_SECTION = document.getElementById('file-selection');
const TEXT_EDITOR_SECTION = document.getElementById('text-editor');
const TEXT_EDITOR_DISPLAY = document.getElementById('text-editor-display');
const LINE_COUNTER_CONTAINER = document.getElementById('line-counter-container');
const SEGMENT_CONTAINER = document.getElementById('segment-container');
const DESCRIPTION_DISPLAY = document.getElementById('description-display');
const ERROR_DISPLAY = document.getElementById('error-display');
const CARET_POSITION_LABEL = document.getElementById('caret-position-label');
const TEXT_AREA_CONTAINER = document.getElementById('text-area-container');
const TEXT_AREA_INPUT = document.getElementById('text-area-input');

const selectBank = (bankCode) => {
    if (bankCode) {
        SELECTION_OPTIONS.bank = bankCode;
        const selectedBankCard = document.querySelector(`#b${bankCode}`);
        selectedBankCard.classList.add('selected');
        CNAB_SECTION.classList.remove('d-none');
    }
}

const selectCnab = (cnabCode) => {
    CNAB_BUTTONS.forEach(btn => btn.classList.remove('selected'));
    if (cnabCode) {
        SELECTION_OPTIONS.cnab = cnabCode;
        const selectedCnabButton = document.querySelector(`#c${cnabCode}`);
        selectedCnabButton.classList.add('selected');
        FILE_SECTION.classList.remove('d-none');
    }
}

const selectFile = (fileCode) => {
    FILE_BUTTONS.forEach(btn => btn.classList.remove('selected'));
    if (fileCode) {
        SELECTION_OPTIONS.file = fileCode;
        const selectedFileButton = document.querySelector(`#${fileCode}`);
        selectedFileButton.classList.add('selected');
        TEXT_AREA_CONTAINER.classList.remove('d-none');
    }
}

const start = (generateNewFile) => {
    SELECTED_TEMPLATE = CNAB_TEMPLATES[SELECTION_OPTIONS.bank][SELECTION_OPTIONS.cnab][SELECTION_OPTIONS.file].templ;
    SEGMENT_FINDER_FUNCTION = CNAB_TEMPLATES[SELECTION_OPTIONS.bank][SELECTION_OPTIONS.cnab][SELECTION_OPTIONS.file].segFind;
    if (generateNewFile) {
        try {
            const segList = getSegments();
            segList.forEach(seg => SEGMENT_CONTAINER.appendChild(seg));
            hideSelectionButtons();
            ERROR_DISPLAY.classList.add('d-none');
        } catch (error) {
            ERROR_DISPLAY.innerText = 'O arquivo informado é inválido';
            ERROR_DISPLAY.classList.remove('d-none');
            console.error(error.message);
        }
    } else {
        const fileContent = TEXT_AREA_INPUT.value;
        if (fileContent) {
            try {
                const segList = getSegmentsFromFileContents(fileContent);
                segList.forEach(seg => SEGMENT_CONTAINER.appendChild(seg));
                hideSelectionButtons();
                ERROR_DISPLAY.classList.add('d-none');
            } catch(error) {
                ERROR_DISPLAY.innerText = 'O arquivo informado é inválido';
                ERROR_DISPLAY.classList.remove('d-none');
                console.error(error.message);
            }
        }
    }
}

const hideSelectionButtons = () => {
    TEXT_AREA_INPUT.value = null;
    BANK_SECTION.classList.add('d-none');
    CNAB_SECTION.classList.add('d-none');
    FILE_SECTION.classList.add('d-none');
    TEXT_AREA_CONTAINER.classList.add('d-none');
    TEXT_EDITOR_SECTION.classList.remove('d-none');
}

const goBack = () => {
    const selectedElements = document.querySelectorAll('.selected');
    SEGMENT_CONTAINER.innerHTML = '';
    LINE_COUNTER_CONTAINER.innerHTML = '';
    TEXT_EDITOR_SECTION.classList.add('d-none');
    BANK_SECTION.classList.remove('d-none');
    selectedElements.forEach(el => el.classList.remove('selected'));
}

const onFocus = (event, segId, posId) => {
    SEGMENT_CONTAINER.childNodes.forEach(node => node.classList.remove('selected'));
    const spanElId = event.srcElement.id;
    const segment = SELECTED_TEMPLATE.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);

    DESCRIPTION_DISPLAY.textContent = `${position.s}/${position.e} ${position.name} - ${position.description}`;
    DESCRIPTION_DISPLAY.classList.remove('d-none');

    const spanEl = document.getElementById(`${spanElId}`);
    spanEl.classList.add('selected');
}

const getSegmentsFromFileContents = (content) => {
    let segList = [];
    let dividedContent = content.split('\n');

    dividedContent.forEach((segContent, index) => {
        if (segContent.length) {
            const seg = SEGMENT_FINDER_FUNCTION(segContent);
            let spanList = [];
            seg.positions.forEach(pos => {
                const spanContent = String(segContent).substring((pos.s-1), (pos.e));
                const spanElement = getSpanElement(seg, pos, spanContent);
                spanList.push(spanElement);
            });
            const newDiv = document.createElement('div');
            const counter = document.createElement('span');
            counter.classList.add('counter-span');
            counter.innerText = index+1;
            LINE_COUNTER_CONTAINER.appendChild(counter);
            newDiv.classList.add('segment');
            newDiv.innerHTML = spanList.join('');
            segList.push(newDiv);
        }
    });

    return segList;
}

const getSegments = () => {
    let segList = [];
    const requiredSegs = SELECTED_TEMPLATE.filter(seg => !seg.optional);
    requiredSegs.forEach((seg, index) => {
        let spanList = [];
        seg.positions.forEach(pos => {
            const spanContent = getSpanContent(pos);
            const spanElement = getSpanElement(seg, pos, spanContent);
            spanList.push(spanElement);
        });
        const newDiv = document.createElement('div');
        const counter = document.createElement('span');
        counter.classList.add('counter-span');
        counter.innerText = index+1;
        LINE_COUNTER_CONTAINER.appendChild(counter);
        newDiv.classList.add('segment');
        newDiv.innerHTML += spanList.join('');
        segList.push(newDiv);
    });
    return segList;
}

const getSpanContent = (pos) => {
    const posLength = (pos.e - pos.s) + 1;
    if (pos.default) {
        if (pos.default === ZEROS) {
            return getChars(posLength, '0');
        }
        if (pos.default === WHITES) {
            return getChars(posLength, ' ');
        }
        return pos.default;
    }
    return getChars(posLength, ' ');
}

const onKeyUp = (event, segId, posId) => {
    if (PREVENT_KEYS.includes(event.key)) {
        executeKeyFunction(event.key);
        event.preventDefault();
        return;
    }

    const segment = SELECTED_TEMPLATE.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);
    updateCaretPosition(event, position);
}

const executeKeyFunction = (key) => {
    if (KEY_FUNCTIONS[key]) {
        KEY_FUNCTIONS[key]();
    }
}

const onKeyPress = (event, maxlength) => {
    if (PREVENT_KEYS.includes(event.key)) {
        event.preventDefault();
        return;
    }

    let text = event.srcElement.innerText;

    if (text.trim().length === 0) {
        event.srcElement.textContent = '';
        return;
    }

    if (text.length === maxlength && text.trim().length > 0) {
        event.preventDefault();
        const srcElement = event.srcElement;
        srcElement.classList.add('warning');
        setTimeout(() => {srcElement.classList.remove('warning')}, 100);
    }
}

const onBlur = (event, maxlength) => {
    const srcElement = event.srcElement;
    srcElement.classList.remove('selected');
    const textLength = srcElement.innerText.length;
    if (textLength < maxlength) {
        const spaces = getChars((maxlength - textLength), ' ');
        srcElement.innerText += spaces;
        srcElement.classList.remove('danger');
    }
    if (textLength > maxlength) {
        srcElement.classList.add('danger');
        srcElement.setAttribute('title', `O número de caracteres excede o limite de ${maxlength} posições`);
    }

    srcElement.classList.remove('selected');
    DESCRIPTION_DISPLAY.classList.add('d-none');
}

const getChars = (length, char) => {
    let i = 0;
    let chars = '';
    while(i < length) { 
        chars += char; 
        i++;
    }
    return chars;
}

const getCaretPosition = (event) => {
    let length = 0;
    const contentEle = event.srcElement;
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clonedRange = range.cloneRange();
    clonedRange.selectNodeContents(contentEle);
    clonedRange.setEnd(range.endContainer, range.endOffset);
    length = clonedRange.toString().length;
    return length;
}

const updateCaretPosition = (event, position) => {
    const caretPosition = getCaretPosition(event);
    CARET_POSITION = position ? caretPosition + position.s : caretPosition;
    updateCaretPositionLabel(CARET_POSITION, position);
}

const updateCaretPositionLabel = (caretPosition, position) => {
    if (caretPosition > position.e) {
        CARET_POSITION_LABEL.classList.add('danger');
    } else {
        CARET_POSITION_LABEL.classList.remove('danger');
    }
    CARET_POSITION_LABEL.innerText = caretPosition;
}

const getSpanElement = (seg, pos, content) => {
    const spanId = Math.floor(pos.id * (Math.random().toFixed(5) * 100000));
    return `<span id="${spanId}" contenteditable="true" onfocus="onFocus(event, ${seg.id}, ${pos.id})" onkeyup="onKeyUp(event, ${seg.id}, ${pos.id})" onkeypress="onKeyPress(event, ${(pos.e-pos.s)+1})" onblur="onBlur(event, ${(pos.e-pos.s)+1})">${content}</span>`;
}

const exportContent = () => {
    const generatedText = SEGMENT_CONTAINER.innerText;
    const a = document.createElement('a');
    a.href = `data:text/plain,${generatedText}`;  
    a.download = `${SELECTION_OPTIONS.bank}${SELECTION_OPTIONS.cnab}${SELECTION_OPTIONS.file}.ret`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
