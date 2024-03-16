const CNAB_TEMPLATES = {
    341: {
        400: {
            ret: itau400retTemplate,
            rem: null
        },
        240: null
    }
}

const SELECTION_OPTIONS = { bank: null, cnab: null, file: null };
let SELECTED_TEMPLATE = null;

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
const DESCRIPTION_DISPLAY = document.getElementById('description-display');
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
    SELECTED_TEMPLATE = CNAB_TEMPLATES[SELECTION_OPTIONS.bank][SELECTION_OPTIONS.cnab][SELECTION_OPTIONS.file];
    if (generateNewFile) {
        try {
            const segList = getSegments();
            segList.forEach((seg, index) => {
                const span = document.createElement('span');
                span.innerText = index+1;
                LINE_COUNTER_CONTAINER.appendChild(span);
                TEXT_EDITOR_DISPLAY.appendChild(seg);
            });
            hideSelectionButtons();
        } catch (error) {
            console.error(error.message);
        }
    } else {
        const fileContent = TEXT_AREA_INPUT.value;
        if (fileContent) {
            try {
                const segList = getSegmentsFromFileContents(fileContent);
                segList.forEach(seg => {
                    const span = document.createElement('span');
                    span.innerText = index+1;
                    LINE_COUNTER_CONTAINER.appendChild(span);
                    TEXT_EDITOR_DISPLAY.appendChild(seg);
                    TEXT_EDITOR_DISPLAY.appendChild(seg)
                });
                hideSelectionButtons();
            } catch(error) {
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
    TEXT_EDITOR_SECTION.classList.add('d-none');
    BANK_SECTION.classList.remove('d-none');
    selectedElements.forEach(el => el.classList.remove('selected'));
    TEXT_EDITOR_DISPLAY.innerHTML = '';
}

const onFocus = (event, segId, posId) => {
    TEXT_EDITOR_DISPLAY.childNodes.forEach(node => node.classList.remove('selected'));
    const segment = SELECTED_TEMPLATE.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);

    DESCRIPTION_DISPLAY.textContent = `${position.s}/${position.e} ${position.name} - ${position.description}`;
    DESCRIPTION_DISPLAY.classList.remove('d-none');

    const spanEl = document.getElementById(`${position.id}`);
    spanEl.classList.add('selected');
}

const getSegmentsFromFileContents = (content) => {
    let segList = [];
    let dividedContent = content.split('\n');

    dividedContent.forEach((segContent) => {
        if (segContent.length) {
            const seg = getCurrentSegment(segContent);
            let spanList = [];
            seg.positions.forEach(pos => {
                const spanContent = String(segContent).substring((pos.s-1), (pos.e));
                const spanElement = getSpanElement(seg, pos, spanContent);
                spanList.push(spanElement);
            });
            const newDiv = document.createElement('div');
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
    requiredSegs.forEach(seg => {
        let spanList = [];
        seg.positions.forEach(pos => {
            const spanContent = getSpanContent(pos);
            const spanElement = getSpanElement(seg, pos, spanContent);
            spanList.push(spanElement);
        });
        const newDiv = document.createElement('div');
        newDiv.classList.add('segment');
        newDiv.innerHTML = spanList.join('');
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

const getCurrentSegment = (segContent) => {
    try {
        const segId = Number(segContent[0]);
        return SELECTED_TEMPLATE.find(seg => seg.id === segId);
    } catch (error) {
        console.error('O arquivo informado é inválido. Detalhes do erro: ', error.message);
    }
}

const onKeyUp = (event, segId, posId) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        return;
    }

    const segment = SELECTED_TEMPLATE.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);

    updateCaretPosition(event, position);
}

const onKeyPress = (event, maxlength) => {
    if (event.key === 'Enter') {
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
    return `<span id="${pos.id}" contenteditable="true" onfocus="onFocus(event, ${seg.id}, ${pos.id})" onkeyup="onKeyUp(event, ${seg.id}, ${pos.id})" onkeypress="onKeyPress(event, ${(pos.e-pos.s)+1})" onblur="onBlur(event, ${(pos.e-pos.s)+1})">${content}</span>`;
}

const exportContent = () => {
    const generatedText = TEXT_EDITOR_DISPLAY.innerText;
    const a = document.createElement('a');
    a.href = `data:text/plain,${generatedText}`;  
    a.download = `${SELECTION_OPTIONS.bank}${SELECTION_OPTIONS.cnab}${SELECTION_OPTIONS.file}.ret`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}