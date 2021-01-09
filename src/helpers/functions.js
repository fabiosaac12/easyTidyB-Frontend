import formVerification from './formVerification'

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

export const verifyFields = (section) => {
    const verification = formVerification[section];
    let isCorrect = true
    for (const key in verification) {
        const inputs = document.getElementsByClassName(key);
        const paragraphs = document.getElementsByClassName(`${key}Fixes`);
        const ver = verification[key];
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const corrections = []
            if (ver[1] && input.value === '') {
                corrections.push('Es requerido.')
            } if (ver[2] && input.value.length > ver[2]) {
                corrections.push(`No puede superar los ${ver[2]} caracteres.`)
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

export const verifyUsername = (username) => {
    let fixes = []
    if (username.length < 7 || username.length > 15) {
        fixes.push("Debe contener entre 7 y 15 caracteres")
    } if (hasSpecialCharacters(username)) {
        fixes.push("No puede contener caracteres especiales")
    }
    return fixes
}

export const verifyPassword = (password) => {
    let fixes = []
    if (password.length < 8 || password.length > 30) {
        fixes.push("Debe contener entre 8 y 30 caracteres")
    } if (!hasNumbers(password)) {
        fixes.push("Debe contener al menos 1 numero")
    } if (!hasLetters(password)) {
        fixes.push("Debe contener al menos 1 letra")
    } if (!hasSpecialCharacters(password)) {
        fixes.push("Debe contener al menos 1 caracter especial")
    }
    return fixes
}

export const verifyPasswordConfirmation = (password, passwordConfirmation) => {
    let fixes = []
    if (password !== passwordConfirmation) {
        fixes.push("No coincide")
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
