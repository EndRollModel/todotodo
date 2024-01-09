// page style with config in here
// Cubic_11,NaikaiFont,GenJyuuGothic
let userSetting;
let appInfoModal;
let confirmModal;

const modalList = {
    font: {name: 'fontSettingModal', object: ''},
    theme: {name: 'themeSettingModal', object: ''},
};

(async function () {
    await loadSetting();
    await createSettingModal(modalList.font);
    await createSettingModal(modalList.theme);
    await settingColor()
    saveSettingListener();
})();

async function loadSetting() {
    userSetting = await window.setting.loadUserSetting()
    // 設定字型
    if (Object.hasOwn(userSetting, 'fontFamily')) {
        document.body.style.fontFamily = userSetting.fontFamily;
    }
    if (Object.hasOwn(userSetting, 'themeColor')){
        changeThemeColor(userSetting.themeColor);
    }
    // 設定讀取時大頭針的圖案
    const onTopState = await window.pageSetting.getOnTop();
    const pinState = document.querySelector('#frameOnTop img');
    if (onTopState === true) {
        pinState.src = './resource/img/pin-fill.svg';
    } else {
        pinState.src = './resource/img/pin.svg';
    }
    // 設定appInfo的modal
    appInfoModal = new bootstrap.Modal(document.getElementById('versionModal'))
    // 確認用的
    confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'))
}

function saveSettingListener() {
    // document.getElementById('frameSetting').addEventListener('click', () => {
    //     settingModal.show();
    // })
    document.getElementById('settingFontBtn').addEventListener('click', () => {
        // 設定字型
        modalList.font.object.show();
    })
    document.getElementById('settingThemeBtn').addEventListener('click', () => {
        // 設定字型
        modalList.theme.object.show();
    })
    document.getElementById('settingALLCancelBtn').addEventListener("click", () => {
        //全部取消
        const msgBox = document.getElementById('confirmModalMsg')
        msgBox.textContent = '是否取消所有打勾的內容？';
        const actionElem = document.getElementById('confirmHidden');
        actionElem.setAttribute('action', 'allCheckCancel');
        confirmModal.show();
    })
    document.getElementById('settingALLDelBtn').addEventListener('click', () => {
        const msgBox = document.getElementById('confirmModalMsg');
        msgBox.textContent = '是否刪除所有內容？';
        const actionElem = document.getElementById('confirmHidden');
        actionElem.setAttribute('action', 'allDataDel');
        confirmModal.show();
    })
    // document.getElementById('settingALLDelBtn').addEventListener('click', ()=>{})
    document.getElementById('frameOnTop').addEventListener('click', async () => {
        // 置頂
        const setOnTop = await window.pageSetting.setOnTop();
        const pinState = document.querySelector('#frameOnTop img');
        if (setOnTop === true) {
            pinState.src = './resource/img/pin-fill.svg';
        } else {
            pinState.src = './resource/img/pin.svg';
        }
    })

    // 關於程式的按鈕
    document.getElementById('settingAppInfoBtn').addEventListener('click', async () => {
        // app的資訊
        const {version, info} = await window.appInfo.version();
        const msgBox = document.getElementById('versionModalMsg');
        const versionNumTitle = document.createElement('h6');
        msgBox.innerHTML = '';
        versionNumTitle.textContent = `版本 : ${version}`;
        const versionNumDate = document.createElement('h6');
        versionNumDate.textContent = `更新日期 : ${info.date}`
        const versionInfo = document.createElement('div');
        let changeNewLine = info.info.replace(/\r/g, '</br>');
        versionInfo.innerHTML = `<hr>${changeNewLine}`;
        msgBox.append(versionNumTitle);
        msgBox.append(versionNumDate);
        msgBox.append(versionInfo);
        appInfoModal.show();
    })

    // clean all checked
    document.getElementById('confirmCheckBtn').addEventListener('click', (e) => {
        // 認證的動作
        const actionValue = document.getElementById('confirmHidden').getAttribute('action')
        switch (actionValue) {
            case 'allCheckCancel':
                // 取消所有內容
                document.querySelectorAll('[type="checkbox"]').forEach((e) => {
                    if (e.checked) {
                        e.click();
                    }
                });
                document.querySelectorAll('[type="checkbox"]').forEach((e) => {
                    if (e.checked) {
                        e.checked = false
                    }
                });
                confirmModal.hide();
                break;
            case 'allDataDel':
                document.querySelector('.item-block').innerHTML = ''; // 清空
                window.userFeat.saveUserData([]);
                confirmModal.hide();
                break;
            default:
                break;
        }
    });
    // document.getElementById('saveSettingBtn').addEventListener('click', () => {
    //     const fontSelect = document.getElementById('fontSelect');
    //     const selectedFont = fontSelect.querySelector('option:checked');
    //     document.body.style.fontFamily = selectedFont.value;
    //     //
    //     userSetting.fontFamily = selectedFont.value;
    //     window.setting.saveUserSetting(userSetting);
    //     //
    //     settingModal.hide();
    // })
}

async function createSettingModal(type) {
    // 創建 modal 元素
    let thisModal;
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    switch (type.name) {
        case modalList.font.name:
            modal.id = modalList.font.name;
            break
        case modalList.theme.name:
            modal.id = modalList.theme.name;
            break
    }
    // modal.id = 'settingModal';
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
    switch (type.name) {
        case modalList.font.name:
            modalBodyOption.append(...await createFontOption());
            break;
        case modalList.theme.name:
            modalBodyOption.append(...await createThemeOption());
            break;
    }

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
    saveSettingBtn.addEventListener('click', () => {
        switch (type.name) {
            case modalList.font.name:
                const fontSelect = document.getElementById('fontSelect');
                const selectedFont = fontSelect.querySelector('option:checked');
                document.body.style.fontFamily = selectedFont.value;
                userSetting.fontFamily = selectedFont.value;
                window.setting.saveUserSetting(userSetting);
                thisModal.hide();
                break;
            case modalList.theme.name:
                thisModal.hide();
                // userSetting.theme = selectTheme.value;
                const themeColor = document.getElementById('settingColorPicker').value
                userSetting.themeColor = themeColor;
                window.setting.saveUserSetting(userSetting);
                changeThemeColor(themeColor);
                break;
        }
    })

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

    thisModal = new bootstrap.Modal(document.getElementById(type.name))
    switch (type.name) {
        case modalList.font.name:
            modalList.font.object = thisModal;
            break;
        case modalList.theme.name:
            modalList.theme.object = thisModal;
            break;
    }
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
        if (Object.hasOwn(userSetting, 'fontFamily')) {
            if (userSetting.fontFamily === e) {
                optionElement.setAttribute('selected', 'true')
            }
        } else {
            if (index === 0) {
                optionElement.setAttribute('selected', 'true');
            }
        }
        optionElement.value = e
        optionElement.textContent = fontList[e];
        // 添加 option 到 select
        selectElement.appendChild(optionElement);
    });
    return [settingFontTitle, selectElement];
}

async function createThemeOption() {
    // 創建 h6 元素
    const settingColorTitle = document.createElement('h6');
    settingColorTitle.id = 'settingBgColorTitle';
    settingColorTitle.textContent = '主題顏色';

    // 創建 select 元素
    const colorInput = document.createElement('input');
    colorInput.id = 'settingColorPicker';
    colorInput.type = 'color';
    if (Object.hasOwn(userSetting, 'themeColor')) {
        colorInput.value = userSetting.themeColor;
    }else {
        colorInput.value = '#FFD6DE';
    }
    return [settingColorTitle, colorInput];
}

function changeThemeColor(changeColor) {
    // 主色系 - FFD6DE
    const allList = {
        mainColor: {
            // 使用主色調(粉#FFD6DE)的名稱列表
            attr: '',
            value: '#FFD6DE',
            list: [
                '--addFeatBDColor',
                '--groupItemBDColor',
                '--memoItemBDColor',
                '--tuduItemBDColor',
                '--dropdownBDColor',
                '--popoverBDColor',
                '--modalInBDColor',
                '--modalInFBDColor',
                '--modalBtnGroupBDColor',
                '--checkColor',
                '--radioColor',
                '--formSelectBDColor',
                '--formSelectFBDColor'
            ]
        },
        itemsBgColor: {
            // item的背景
            attr: '',
            value: '#FFFFFF4C',
            list: [
                '--groupItemBGColor',
                '--memoItemBGColor',
                '--tuduItemBGColor',
            ]
        },
        itemsBs: {
            // items的陰影
            attr: '0.03rem 0.03rem 0 0',
            value: '#FFD6DE',
            list: [
                '--groupItemBS',
                '--memoItemBS',
                '--tuduItemBS'
            ]
        },
        radioCheckBS: {
            // check & radio 點選時的顏色
            attr: 'inset 0 0 0 0.7px',
            value: '#FFD6DE',
            // value: '#E0B9C1',
            list: ['--checkBEBS']
        },
        focusBS: {
            attr: '2px 2px 0 0',
            value: '#FFD6DE',
            list: [
                '--modalInFBS',
                '--modalBtnGroupHoverBs',
                '--formSelectFBS',
            ]
        },
        dropdown: {
            attr: '',
            value: '#FFD6DE7F',
            list: [
                '--dropdownHoverColor',
                '--dropdownActiveColor',
            ]
        }
    }
    let replaceColor = '#FFD6DE';
    let root = document.documentElement;
    Object.keys(allList).forEach((type) => {
        let setValue = '';
        if (allList[type].attr !== '') {
            setValue += `${allList[type].attr} `
        }
        setValue += allList[type].value.includes(replaceColor) ? allList[type].value.replace(replaceColor, changeColor) : allList[type].value;
        allList[type].list.forEach((name) => {
            root.style.setProperty(name, setValue)
        })
    });
}

async function settingColor() {
    const mainBackground = document.querySelector('.body-block'); // 主題背景
    // document.querySelector('[]')
    // dark mode
}
