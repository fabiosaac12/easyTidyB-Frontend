import formVerification from './formVerification'
import translations from './translations';
import { changeLanguage } from "../store/workspaceActions.js";

export const switchLanguage = (lang, dispatch) => {
    const newLang = document.getElementById('langButton').getAttribute("name");
    if (lang !== newLang) {
	dispatch(changeLanguage({ language: newLang }));
    }
};

export const elementToJSON = (tds, headers) => {
    let element = {};
    let i = 0;
    for (let col in headers) {
        const header = headers[col][0];
        const value = tds[i].innerHTML;
        element[header] = value;
        i++;
    }
    return element;
};

export const request = async (url, init = { method: "GET" }) => {
    const response = await fetch(url, init);
    const data = await response.json();
    return data;
};

export const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
};

export const verifyFields = (section, lang) => {
    const verification = formVerification[section];
    let isCorrect = true
    for (const key in verification) {
        const inputs = document.getElementsByClassName(key);
        const paragraphs = document.getElementsByClassName(`${key}Fixes`);
        const ver = verification[key];
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const corrections = []
            if (ver[0] && (input.value === '' || (key==='quantity' && input.value===0))) {
                corrections.push(translations[lang].corrections.isRequired)
            } if (ver[1] && input.value.length > ver[1]) {
                corrections.push(translations[lang].corrections.maxLength(ver[1]))
            }
            if (corrections.length > 0) {
                const p = paragraphs[i];
                showFixes(p, corrections);
                isCorrect = false
            }
        }
    }
    return isCorrect
};

export const verifyUsername = (username, lang) => {
    let fixes = []
    if (username.length < 7 || username.length > 15) {
        fixes.push(translations[lang].corrections.usernameRange)
    } if (hasSpecialCharacters(username)) {
        fixes.push(translations[lang].corrections.noSpecialChars)
    }
    return fixes
}

export const verifyPassword = (password, lang) => {
    let fixes = []
    if (password.length < 8 || password.length > 30) {
        fixes.push(translations[lang].corrections.passRange)
    } if (!hasNumbers(password)) {
        fixes.push(translations[lang].corrections.numberRequired)
    } if (!hasLetters(password)) {
        fixes.push(translations[lang].corrections.letterRequired)
    } if (!hasSpecialCharacters(password)) {
        fixes.push(translations[lang].corrections.specialCharRequired)
    }
    return fixes
}

export const verifyPasswordConfirmation = (password, passwordConfirmation, lang) => {
    let fixes = []
    if (password !== passwordConfirmation) {
        fixes.push(translations[lang].corrections.noMatch)
    }
    return fixes
}

export const showFixes = (p, verification) => {
    p.innerHTML = '';
    for (let i = 0; i < verification.length; i++) {
        const fix = verification[i];
        p.innerHTML += i === 0 ? `• ${fix}` : `<br>• ${fix}`;
    }
}

const hasNumbers = (string) => {
    const numbers = '0123456789'.split('');
    const characters = string.split('');
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (numbers.includes(char)) {
            return true
        }
    }
    return false
}

const hasLetters = (string) => {
    const letters = 'qwertyuiopasdfghjklzxcvbnmñ'.split('');
    const characters = string.split('');
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (letters.includes(char)) {
            return true
        }
    }
    return false
}

const hasSpecialCharacters = (string) => {
    const specialCharacters = '`~!@#$%^&*()-_=+\\|}{][\'":;?/>.<,'.split('');
    const characters = string.split('');
    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        if (specialCharacters.includes(char)) {
            return true
        }
    }
    return false
}

export const calculateAvailableProductsLength = (products) => {
    let availableProductsLength = 0;
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.available > 0) {
            availableProductsLength++
        }
    }
    return availableProductsLength
}

export const collectionToArray = (collection) => {
    let array = [];
    for (let i = 0; i < collection.length; i++) {
        const element = collection[i];
        array.push(element)
    }
    return array
}

export const resetInputs = (changeSection=true) => {
    let inputs = document.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.value = input.id === 'searcher' && changeSection === false ? input.value : '';
        if (input.getAttribute('name') === 'date') {
            input.valueAsDate = new Date()
        }
    }
}

export const resetCorrectionPs = () => {
    const correctionPs = document.getElementsByClassName('correctionsP')
    for (let i = 0; i < correctionPs.length; i++) {
        const p = correctionPs[i].getElementsByTagName('small')[0];
        p.innerHTML = ''
    }
}

export const cleanParagraphs = (paragraphs) => {
    for (const key in paragraphs) {
        paragraphs[key].innerHTML = ''
    }
}

export const getInnerText = (e) => {
    const elem = e.cloneNode(true);
    for (var i = elem.childNodes.length - 1; i >= 0; i--) {
        if (elem.childNodes[i].tagName) elem.removeChild(elem.childNodes[i]);
    }
    var innerText = elem['innerText' in elem ? 'innerText' : 'textContent'];
    return innerText
}
