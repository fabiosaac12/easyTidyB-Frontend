import data from './data';
import {roundToTwo, showFixes} from '../helpers/functions';

const clearFields = (target, inputs, modifyMode) => {
    if (!modifyMode) {
        for (const key in inputs) {
            let input = inputs[key];
            if (input.getAttribute('name') === 'productID') {
                input.parentNode.parentNode.getElementsByTagName('small')[0].innerHTML=''
            } else {
                input.parentNode.getElementsByTagName('small')[0].innerHTML=''
            }
        }
    }
    
    const {productID, quantity, obtained, discount, type} = inputs
    if ((target === quantity) || (target === productID) || (target === type)) {
        obtained.value = '';
    } else if (target === obtained) {
        discount.value = '';
        if (target.value === '') {
            target.value = 0
        }
    } else if (target === discount) {
        obtained.value = ''
    }
    if (['', '0'].includes(quantity.value)) {
        quantity.value = 1
    }
}

const getSaleProduct = (products, productID) => {
    const product = products.find(product => product.value === parseInt(productID))
    const saleProduct = Object.assign({}, product);
    for (let i in saleProduct) {
	saleProduct[i] = parseFloat(saleProduct[i])
    }
    return saleProduct
}

const calculateSale = (e, form, modifyMode=false) => {
    const inputs = {
        productID: form.getElementsByClassName(`productID${modifyMode ? 'TD' : ''}`)[0],
        quantity: form.getElementsByClassName(`quantity${modifyMode ? 'TD' : ''}`)[0],
        obtained: form.getElementsByClassName(`obtained${modifyMode ? 'TD' : ''}`)[0],
        profit: form.getElementsByClassName(`profit${modifyMode ? 'TD' : ''}`)[0],
        discount: form.getElementsByClassName(`discount${modifyMode ? 'TD' : ''}`)[0],
        type: modifyMode ? form.getElementsByClassName(`type${modifyMode ? 'TD' : ''}`)[0] : document.getElementById('mainForm').getElementsByClassName('type')[0]
    }
    clearFields(e.target, inputs, modifyMode)
    
    const values = {
        productID: isNaN(parseInt(inputs['productID'].value)) ? '' : parseInt(inputs['productID'].value),
        quantity: isNaN(parseInt(inputs['quantity'].value)) ? '' : parseInt(inputs['quantity'].value),
        obtained: isNaN(parseFloat(inputs['obtained'].value)) ? '' : parseFloat(inputs['obtained'].value),
        profit: isNaN(parseFloat(inputs['profit'].value)) ? '' : parseFloat(inputs['profit'].value),
        discount: isNaN(parseFloat(inputs['discount'].value)) ? '' : parseFloat(inputs['discount'].value),
        type: inputs['type'].value
    }
    
    const {retailPrice, wholesalePrice, purchasePrice, available} = getSaleProduct(data['Products'], values.productID)
    
    // verifying if the sale product quantity is greater than the available products
    if (values.quantity > available) {
        if (!modifyMode) {
            const p = e.target.parentNode.parentNode.parentNode.getElementsByClassName('quantityFixes')[0]
            showFixes(p, [`Solo quedan ${available} unidades del producto`])
        }
        inputs['quantity'].value = available
        values.quantity = available
    }

    // setting the product price depending on wether the sale is wholesale or retail
    let price
    if (values.type === 'Mayor') {
        price = wholesalePrice
    } else {
        price = retailPrice
    }
    
    const normalObtained = roundToTwo(price*values.quantity);
    // setting the obtained value depending on wether the user has entered the obtained or discount value
    if ((values.obtained === "") && (values.discount === "")) {
        values.obtained = roundToTwo(normalObtained)
    } else if ((values.obtained === "") && (values.discount !== "")) {
        values.obtained = roundToTwo(normalObtained - ((normalObtained*values.discount)/100))
    }

    
    // calculating the discount and profit on this sale
    values.discount = roundToTwo(((normalObtained-values.obtained)*100)/normalObtained);
    values.profit = roundToTwo(values.obtained - (purchasePrice*values.quantity));
    
    // setting the corresponding input values
    inputs['obtained'].value = isNaN(values.obtained) ? 0 : values.obtained;
    inputs['profit'].value = isNaN(values.profit) ? 0 : values.profit;
    inputs['discount'].value = isNaN(values.discount) ? 0 : values.discount;
}

const resetOptions = (select) => {
    const options = select.parentNode.getElementsByTagName('li');
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.classList.remove('disabledOption')
    }
}

// const hasTheSame = (selects) => {
//     let values = []
//     for (let i = 0; i < selects.length; i++) {
//         const select = selects[i];
//         if (values.includes(select.value)) {
//             return true
//         }
//         values.push(select.value)
//     }
//     return false
// }

const disableOptions = (selectValues, optionsCollection) => {
    for (let i = 0; i < optionsCollection.length; i++) {
        const options = optionsCollection[i];
        for (let j = 0; j < options.length; j++) {
            const option = options[j];
            const optionValue = option.getElementsByTagName('span')[0].innerHTML
            if (selectValues.includes(optionValue)) {
                if (selectValues.indexOf(optionValue) !== i) {
                    option.className += " disabledOption"
                }
            }
        }
    }
}

// const setNoRepeatedValues = (selects) => {
//     let selectValues = [];
//     while (hasTheSame(selects)) {
//         for (let i = 0; i < selects.length; i++) {
//             const select = selects[i];
//             if (selectValues.includes(select.value)) {
//                 const options = select.getElementsByTagName('option');
//                 let hasSelected = false
//                 for (let i = 0; i < options.length; i++) {
//                     const opt = options[i];
//                     if (selectValues.includes(opt.value)) {
//                         opt.disabled = true;
//                     } else if (opt.className !== 'd-none' && opt.disabled !== true && hasSelected===false) {
//                         select.value = opt.value;
//                         hasSelected = true;
//                     }
//                 }
//             }
//             selectValues.push(select.value);
//         }
//     }
// }

export const monitorProductSelects = () => {
    const productSelects = document.getElementsByName('productID');
    
    for (let i = 0; i < productSelects.length; i++) {
        const select = productSelects[i];
        resetOptions(select);
    }
    
    // setNoRepeatedValues(productSelects)
    
    let selectValues = [];
    let optionsCollection = []
    //getting select values and select options
    for (let i = 0; i < productSelects.length; i++) {
        const select = productSelects[i];
        selectValues.push(select.value)
        optionsCollection.push(select.parentNode.getElementsByTagName('li'))
    }
    disableOptions(selectValues, optionsCollection)
}

export default calculateSale
