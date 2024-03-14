let CARET_POSITION = 0;

const fileContent = `02RETORNO01COBRANCA       072400654321        DUNDER MIFFLIN PAPER COMPANY L341BANCO ITAU S.A.12032401600BPI00050120324                                                                                                                                                                                                                                                                                   000001
10216958379000187072400654321        T280220240101            00000001            099000000011             I06040923000831500100000325            04092300000013373783416305701000000000014000000000000000000000000000000000000000000000000000000000000040121000000129711700000000000000000000000000   05092300000000000000000000000MUNDIALMIX COMERCIO DE ALIM...                                      CK000016`
const CNAB_BUTTONS = document.querySelectorAll('.cnab-button');

const selectBank = (bankCode) => {
    if (bankCode) {
        const selectedBankCard = document.querySelector(`#b${bankCode}`);
        selectedBankCard.classList.add('selected');
        const cnabSection = document.querySelector('#cnab-selection');
        cnabSection.classList.remove('d-none');
    }
}

const selectCnab = (cnabCode) => {
    if (cnabCode) {
        const selectedCnabButton = document.querySelector(`#c${cnabCode}`);
        selectedCnabButton.classList.add('selected');
        const textEditorSection = document.querySelector('#text-editor');
        const bankSection = document.querySelector('#bank-selection');
        const cnabSection = document.querySelector('#cnab-selection');
        bankSection.classList.add('d-none');
        cnabSection.classList.add('d-none');
        textEditorSection.classList.remove('d-none');
        
        const textEditorDisplay = document.getElementById('text-editor-display');
        const spanList = getSpanElementsFromFileContents(fileContent);
        spanList.forEach(span => {
            textEditorDisplay.appendChild(span);
        });
    }
}

const goBack = () => {
    const selectedElements = document.querySelectorAll('.selected');
    const textEditorSection = document.querySelector('#text-editor');
    const bankSection = document.querySelector('#bank-selection');
    textEditorSection.classList.add('d-none');
    bankSection.classList.remove('d-none');
    selectedElements.forEach(el => el.classList.remove('selected'));
}

const onFocus = (event, segId, posId) => {
    const textEditorDisplay = document.getElementById('text-editor-display');
    textEditorDisplay.childNodes.forEach(node => node.classList.remove('selected'));
    const segment = itau400retTemplate.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);
    const descriptionDisplay = document.getElementById('description-display');
    descriptionDisplay.textContent = `${position.s}/${position.e} ${position.name} - ${position.description}`;
    descriptionDisplay.classList.remove('d-none');
    const spanEl = document.getElementById(`${position.id}`);
    spanEl.classList.add('selected');
}

const getSpanElementsFromFileContents = (content) => {
    let divList = [];
    let dividedContent = content.split('\n');

    dividedContent.forEach((segContent, index) => {
        const seg = itau400retTemplate[index];
        let spanList = [];
        seg.positions.forEach(pos => {
            const spanContent = String(segContent).substring((pos.s-1), (pos.e));
            spanList.push(`<span id="${pos.id}" contenteditable="true" onfocus="onFocus(event, ${seg.id}, ${pos.id})" onkeyup="onKeyUp(event, ${seg.id}, ${pos.id})" onkeypress="onKeyPress(event, ${(pos.e-pos.s)+1})" onblur="onBlur(event, ${(pos.e-pos.s)+1})">${spanContent}</span>`);
        });
        const newDiv = document.createElement('div');
        newDiv.classList.add('segment');
        newDiv.innerHTML = spanList.join('');
        divList.push(newDiv);
    });

    return divList;
}

const onKeyUp = (event, segId, posId) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        return;
    }

    const segment = itau400retTemplate.find(seg => seg.id === segId);
    const position = segment.positions.find(pos => pos.id === posId);

    updateCaretPosition(event, position);
}

const onKeyPress = (event, maxlength) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        return;
    }

    const text = event.srcElement.innerText;
    if (text.length === maxlength) {
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
        const spaces = getSpaces((maxlength - textLength));
        srcElement.innerText += spaces;
    }
    if (textLength > maxlength) {
        srcElement.classList.add('danger');
        srcElement.setAttribute('title', `O número de caracteres excede o limite de ${maxlength} posições`);
    }

    srcElement.classList.remove('selected');
    const descDisplay = document.getElementById('description-display');
    descDisplay.classList.add('d-none');
}

const getSpaces = (spacesNum) => {
    let i = 0;
    let spaces = '';
    while(i < spacesNum) { 
        spaces += ' ' 
        i++;
    }
    return spaces;
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
    const caretPositionLabelEl = document.getElementById('caret-position-label');
    if (caretPosition > position.e) {
        caretPositionLabelEl.classList.add('danger');
    } else {
        caretPositionLabelEl.classList.remove('danger');
    }
    caretPositionLabelEl.innerText = caretPosition;
}
