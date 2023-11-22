// page style with config in here
//Cubic_11,NaikaiFont,GenJyuuGothic
let settingModal;

(async function () {
    await createSettingModal();
    saveSettingListener();
})()

function saveSettingListener() {
    document.getElementById('frameSetting').addEventListener('click', () => {
        settingModal.show();
    })
    document.getElementById('saveSettingBtn').addEventListener('click', () => {
        const fontSelect = document.getElementById('fontSelect');
        const selectedFont = fontSelect.querySelector('option:checked');
        document.body.style.fontFamily = selectedFont.value;
        settingModal.hide();
    })
}

async function createSettingModal() {
    // 創建 modal 元素
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'settingModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('data-bs-backdrop', 'static');
    modal.setAttribute('aria-hidden', 'true');

    // 創建 modal-dialog 元素
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-dialog-centered';

    // 創建 modal-content 元素
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // 創建 modal-header 元素
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';

    // 創建 modal-title 元素
    const modalTitle = document.createElement('h5');
    modalTitle.className = 'modal-title';
    modalTitle.id = 'settingModalTitle';
    modalTitle.textContent = '設定選項';

    // 創建 btn-close 元素
    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.className = 'btn-close';
    btnClose.setAttribute('data-bs-dismiss', 'modal');
    btnClose.setAttribute('aria-label', 'Close');

    // 添加 modal-title 和 btn-close 到 modal-header
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(btnClose);

    // 創建 modal-body 元素
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';

    // 創建 modal-body-option 元素
    const modalBodyOption = document.createElement('div');
    modalBodyOption.className = 'modal-body-option';
    modalBodyOption.style.display = 'flex';
    modalBodyOption.style.justifyContent = 'center';
    modalBodyOption.style.alignItems = 'baseline';
    modalBodyOption.style.flexDirection = 'row';

    // const settingFontTitle = await createFontOption();

    // 添加 h6 和 select 到 modal-body-option
    // modalBodyOption.appendChild(settingFontTitle);
    // modalBodyOption.appendChild(selectElement);
    modalBodyOption.append(...await createFontOption());

    // 創建 p 元素
    const delItemHidden = document.createElement('p');
    delItemHidden.id = 'delItemHidden';
    delItemHidden.setAttribute('hidden', 'hidden');

    // 創建 modal-btn-group 元素
    const modalBtnGroup = document.createElement('div');
    modalBtnGroup.className = 'modal-btn-group';

    // 創建保存按鈕
    const saveSettingBtn = document.createElement('button');
    saveSettingBtn.id = 'saveSettingBtn';
    saveSettingBtn.type = 'button';
    saveSettingBtn.textContent = '保存';

    // 創建取消按鈕
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.setAttribute('data-bs-dismiss', 'modal');
    cancelBtn.textContent = '取消';

    // 添加按鈕到 modal-btn-group
    modalBtnGroup.appendChild(saveSettingBtn);
    modalBtnGroup.appendChild(cancelBtn);

    // 添加所有元素到 modal-body
    modalBody.appendChild(modalBodyOption);
    modalBody.appendChild(delItemHidden);
    modalBody.appendChild(modalBtnGroup);

    // 添加 modal-header 和 modal-body 到 modal-content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);

    // 添加 modal-content 到 modal-dialog
    modalDialog.appendChild(modalContent);

    // 添加 modal-dialog 到 modal
    modal.appendChild(modalDialog);

    // 將 modal 添加到 body 中
    document.body.appendChild(modal);

    settingModal = new bootstrap.Modal(document.getElementById('settingModal'))
}

// 字型選項的內容
async function createFontOption() {
    // 創建 h6 元素
    const settingFontTitle = document.createElement('h6');
    settingFontTitle.id = 'settingFontTitle';
    settingFontTitle.textContent = '字體';

    // 創建 select 元素
    const selectElement = document.createElement('select');
    selectElement.id = 'fontSelect'
    selectElement.className = 'form-select';
    selectElement.style.width = '70%';
    selectElement.setAttribute('aria-label', '');

    // 創建 option 元素
    const fontList = await window.font.getFontList();
    Object.keys(fontList).forEach((e, index) => {
        const optionElement = document.createElement('option');
        if (index === 0) {
            optionElement.setAttribute('selected', 'true');
        }
        optionElement.value = e
        optionElement.textContent = fontList[e];
        // 添加 option 到 select
        selectElement.appendChild(optionElement);
    });
    return [settingFontTitle, selectElement];
}

