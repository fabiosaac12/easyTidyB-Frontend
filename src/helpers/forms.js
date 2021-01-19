import calculateSale, { monitorProductSelects } from "./saleFormActions";

const forms = {
    Sales: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'fsControl d-none inputData',
            step: null,
            min: null,
            disabled: false,
	    heritable: 'notHeritable',
	    onChange: () => null
        },
        'clientID': {
            tag: 'select',
            name: 'clientID',
            className: 'fsControl',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/salesClients/select`
            },
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'productID': {
            tag: 'select',
            name: 'productID',
            className: 'fsControl',
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
            className: 'fsControl inputData',
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
            className: 'fsControl inputData',
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
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: 'any',
            min: null,
            disabled: true,
            heritable: 'heritable',
	    onChange: () => null

        },
        'discount': {
            tag: 'input',
            type: 'number',
            name: 'discount',
            className: 'fsControl inputData',
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
            className: 'fsControl inputData',
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
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
    },
    Clients: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'fsControl d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable',
	    onChange: () => null

        },
        'contact': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable',
	    onChange: () => null

        },
        'place': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        }
    },
    Products: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'fsControl d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'orderID': {
            tag: 'select',
            name: 'orderID',
            className: 'fsControl',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/productsOrders/select`
            },
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'char1': {
            tag: 'input',
            type: 'text',
            name: 'char1',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable',
	    onChange: () => null

        },
        'char2': {
            tag: 'input',
            type: 'text',
            name: 'char2',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'heritable',
	    onChange: () => null

        },
        'initialStock': {
            tag: 'input',
            type: 'number',
            name: 'initialStock',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: 0,
            disabled: false,
            heritable: 'heritable',
	    onChange: () => null

        },
	'retailPrice': {
            tag: 'input',
            type: 'number',
            name: 'retailPrice',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'wholesalePrice': {
            tag: 'input',
            type: 'number',
            name: 'wholesalePrice',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'purchasePrice': {
            tag: 'input',
            type: 'number',
            name: 'purchasePrice',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        }
    },
    Orders: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'fsControl d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'supplierID': {
            tag: 'select',
            name: 'supplierID',
            className: 'fsControl inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            choices: {
                url: `${process.env.REACT_APP_API_URL}/ordersSuppliers/select`
            },
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'expectedObtained': {
            tag: 'input',
            type: 'number',
            name: 'expectedObtained',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: 'any',
            min: 0,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'orderDate': {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        }
    },
    Suppliers: {
        'id': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'fsControl d-none inputData',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'name': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            divClass: 'col-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'contact': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        },
        'place': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'fsControl inputData',
            divClass: 'col-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable',
	    onChange: () => null

        }
    }
}

export default forms
