import { backToRegisterMode } from '../components/ActionsButtons';
import { collectionToArray, request, showFixes } from '../helpers/functions';
import translations from './translations';


const addElement = async (section, data, userID) => {
    const url = `${process.env.REACT_APP_API_URL}/${section}/${userID}`;
    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await request(url, init);
    return response
}

const modifyElement = async (section, data) => {
    const url = `${process.env.REACT_APP_API_URL}/${section}`;
    const init = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await request(url, init);
    return response
}

export const modifyFromTable = async (section, updateTable, addCharge, removeCharge, form) => {
    const formInputs = collectionToArray(form.getElementsByTagName("input")).concat(collectionToArray(form.getElementsByTagName("select")))
    const formValues = {}
    for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];
        const inputName = input.getAttribute("name")
        const inputValue = input.value
        formValues[inputName] = inputValue
    }
    addCharge()
    await modifyElement(section, formValues)
    if (["Sales", "Products"].includes(section)) {
	await updateTable()
    } else {
	await updateTable(section, 'detailed')
    }
    removeCharge()
}

const sendForms = async (section, resetAll, updateMainTable, userID, addCharge, removeCharge, lang) => {
    const mainForm = document.getElementById('mainForm');
    const mainInputs = mainForm.getElementsByClassName('notHeritable')
    const forms = document.getElementsByClassName('formToSend')

    let formsValues = []
    for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        let formInputs = form.getElementsByClassName('heritable')
        let formValues = {}
        for (let i = 0; i < formInputs.length; i++) {
            let input
            if (formInputs[i].tagName === 'INPUT') {
                input = formInputs[i];
            } else {
                input = formInputs[i].getElementsByTagName('input')[1]
            }
            formValues[input.name] = input.value
        }
        for (let i = 0; i < mainInputs.length; i++) {
            let input
            if (mainInputs[i].tagName === 'INPUT' || mainInputs[i].tagName === 'SELECT') {
                input = mainInputs[i];
            } else {
                input = mainInputs[i].getElementsByTagName('input')[1]
            }
            formValues[input.name] = input.value
        }
        formsValues.push(formValues);
    }

    const modifyMode = document.getElementById('registerButton').innerHTML === 'Modificar';
    let response
    addCharge()
    if (modifyMode) {
        response = await modifyElement(section, formsValues[0])
    } else {
        response = await addElement(section, formsValues, userID)
    }
    removeCharge()
    const isCorrect = verifyResponse(response, lang)
    if (isCorrect) {
        modifyMode ? backToRegisterMode(section, resetAll, lang) : resetAll(false)
        updateMainTable();
    }
}

const verifyResponse = (response, lang) => {
    const nameInputs = document.getElementsByClassName('name');
    switch (response.message) {
        case 'good':
            return true
        case 'Repeated data':
            for (let i = 0; i < nameInputs.length; i++) {
                const input = nameInputs[i];
                if (input.value === response.name) {
                    const p = input.parentNode.getElementsByClassName('correctionsP')[0].getElementsByTagName('small')[0];
                    showFixes(p, [translations[lang].corrections.nameUsed(response.name)])
                }
            }
            return false
        case 'Database error':
            for (let i = 0; i < nameInputs.length; i++) {
                const input = nameInputs[i];
                const p = input.parentNode.getElementsByClassName('correctionsP')[0].getElementsByTagName('small')[0];
                showFixes(p, ['Database error'])
            }
            return false
        default:
            return false
    }
}

export default sendForms
