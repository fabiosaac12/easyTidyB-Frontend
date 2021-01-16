import calculateSale, { monitorProductSelects } from "./saleFormActions";

const forms = {
    Sales: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'clientID': {
            tag: 'select',
            name: 'clientID',
            className: 'form-control',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/salesClients/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'productID': {
            tag: 'select',
            name: 'productID',
            className: 'form-control',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/salesProducts/select`
            },
            disabled: false,
            heritable: 'heritable',
            onChange: (e, lang) => {
                monitorProductSelects()
                calculateSale({target: e.target.parentNode.getElementsByTagName('input')[1]}, e.target.parentNode.parentNode.parentNode.parentNode, false, lang)
            }
        },
        'quantity': {
            tag: 'input',
            type: 'number',
            name: 'quantity',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: 0,
            disabled: false,
            heritable: 'heritable',
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode.parentNode, false, lang)
        },
        'obtained': {
            tag: 'input',
            type: 'number',
            name: 'obtained',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: null,
            disabled: false,
            heritable: 'heritable',
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode.parentNode, false, lang)
        },
        'profit': {
            tag: 'input',
            type: 'number',
            name: 'profit',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: null,
            disabled: true,
            heritable: 'heritable'
        },
        'discount': {
            tag: 'input',
            type: 'number',
            name: 'discount',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: null,
            disabled: false,
            heritable: 'heritable',
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode.parentNode, false, lang)
        },
        'type': {
            tag: 'select',
            name: 'type',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            choices: {
                url: false,
                options: [
                    {
                        value: 'Retail',
                        label: 'Retail'
                    },
                    {
                        value: 'Wholesale',
                        label: 'Wholesale'
                    }
                ]
            },
            disabled: false,
            heritable: 'notHeritable',
            onChange: (e, lang) => {
                const forms = document.getElementsByClassName('formToSend')
                for (let i = 0; i < forms.length; i++) {
                    const form = forms[i];
                    calculateSale(e, form, false, lang)    
                }
            }
        },
        'date': {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
    },
    Clients: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable'
        },
        'contact': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable'
        },
        'place': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        }
    },
    Products: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'orderID': {
            tag: 'select',
            name: 'orderID',
            className: 'form-control',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/productsOrders/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'char1': {
            tag: 'input',
            type: 'text',
            name: 'char1',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable'
        },
        'char2': {
            tag: 'input',
            type: 'text',
            name: 'char2',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable'
        },
        'initialStock': {
            tag: 'input',
            type: 'number',
            name: 'initialStock',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: 0,
            disabled: false,
            heritable: 'heritable'
        },
	'retailPrice': {
            tag: 'input',
            type: 'number',
            name: 'retailPrice',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable'
        },
        'wholesalePrice': {
            tag: 'input',
            type: 'number',
            name: 'wholesalePrice',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable'
        },
        'purchasePrice': {
            tag: 'input',
            type: 'number',
            name: 'purchasePrice',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable'
        }
    },
    Orders: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'supplierID': {
            tag: 'select',
            name: 'supplierID',
            className: 'form-control inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/ordersSuppliers/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'expectedObtained': {
            tag: 'input',
            type: 'number',
            name: 'expectedObtained',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable'
        },
        'orderDate': {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        }
    },
    Suppliers: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'contact': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'place': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'form-control inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        }
    }
}

export default forms
