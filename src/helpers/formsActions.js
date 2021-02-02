import { backToRegisterMode } from '../components/ActionsButtons';
import {verifySoldProducts} from '../components/Form';
import { collectionToArray, request, showFixes } from '../helpers/functions';
import translations from './translations';


const addElement = async (section, data, accessToken) => {
    const url = `${process.env.REACT_APP_API_URL}/${section}`;
    const init = {
        method: 'POST',
        body: JSON.stringify(data)
    };
    const response = await request(url, accessToken, init);
    return response
}

const modifyElement = async (section, data, accessToken) => {
    console.log(section, data, accessToken)
    const url = `${process.env.REACT_APP_API_URL}/${section}`;
    const init = {
        method: 'PUT',
        body: JSON.stringify(data)
    };
    const response = await request(url, accessToken, init);
    return response
}

export const modifyFromTable = async (section, updateTable, addCharge, removeCharge, form, accessToken) => {
    const formInputs = collectionToArray(form.getElementsByTagName("input")).concat(collectionToArray(form.getElementsByTagName("select")))
    const formValues = {}
    for (let i = 0; i < formInputs.length; i++) {
        const input = formInputs[i];
        const inputName = input.getAttribute("name")
        const inputValue = input.value
        formValues[inputName] = inputValue
    }
    if (section==='Products') {
	const verification = await verifySoldProducts(accessToken,formValues.id, formValues.initialStock)
	if (!verification) return false
    }
    addCharge()
    await modifyElement(section, formValues, accessToken)
    if (["Sales", "Products"].includes(section)) {
	await updateTable()
    } else {
	await updateTable(section, 'detailed')
    }
    removeCharge()
    return true
}

const sendForms = async (section, resetAll, updateMainTable, accessToken, addCharge, removeCharge, lang) => {
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

    const modifyMode = document.getElementById('registerButton').innerHTML === translations[lang].words.modify;
    let response
    addCharge()
    if (modifyMode) {
        response = await modifyElement(section, formsValues[0], accessToken)
    } else {
        response = await addElement(section, formsValues, accessToken)
    }
    removeCharge()
    const isCorrect = verifyResponse(response, lang)
    if (isCorrect) {
        modifyMode ? backToRegisterMode(section, resetAll, lang) : resetAll(false)
        updateMainTable();
    }
}

export const simpleAddElement = async (section, data, accessToken, lang) => {
    const response = await addElement(section, data, accessToken)
    const isCorrect = verifyResponse(response, lang)
    return {response, isCorrect}
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
