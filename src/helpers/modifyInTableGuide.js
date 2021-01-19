import calculateSale from '../helpers/saleFormActions';

const modifyInTableInputs = {
    Sales: {
        id: {
            tag: 'input',
            className: 'fsControl id',
            name: 'id',
            disabled: true
        },
        clientID: {
            tag: 'select',
            name: 'clientID',
            className: 'fsControl inputData',
            step: null,
            min: null,
            choices: {
                options: "Clients"
            },
            disabled: false,
            heritable: 'notHeritable',
            onChange: () => null
        },
        productID: {
            tag: 'select',
            name: 'productID',
            className: 'fsControl inputData',
            step: null,
            min: null,
            choices: {
                options: "Products"
            },
            disabled: true,
            heritable: 'notHeritable',
            onChange: () => null
        },
        quantity: {
            tag: 'input',
            type: 'number',
            name: 'quantity',
            className: 'fsControl inputData',
            step: null,
            min: 0,
            disabled: false,
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode, true, lang)
        },
        obtained: {
            tag: 'input',
            type: 'number',
            name: 'obtained',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: false,
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode, true, lang)
        },
        profit: {
            tag: 'input',
            type: 'number',
            name: 'profit',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: true,
            onChange: () => null
        },
        discount: {
            tag: 'input',
            type: 'number',
            name: 'discount',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: false,
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode, true, lang)
        },
        type: {
            tag: 'select',
            name: 'type',
            className: 'fsControl inputData',
            step: null,
            min: null,
            choices: {
                options: [{
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
            onChange: (e, lang) => calculateSale(e, e.target.parentNode.parentNode, true, lang)
        },
        date: {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'fsControl inputData',
            onChange: () => null
        }
    },
    Products: {
        id: {
            tag: 'input',
            className: 'fsControl id',
            name: 'id',
            disabled: true,
            onChange: () => null
        },
        orderID: {
            tag: 'select',
            name: 'orderID',
            className: 'fsControl inputData',
            step: null,
            min: null,
            choices: {
                options: "Orders"
            },
            disabled: false,
            heritable: 'notHeritable',
            onChange: () => null
        },
        name: {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        char1: {
            tag: 'input',
            type: 'text',
            name: 'char1',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        char2: {
            tag: 'input',
            type: 'text',
            name: 'char2',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        initialStock: {
            tag: 'input',
            type: 'number',
            name: 'initialStock',
            className: 'fsControl inputData',
            step: null,
            min: 0,
            disabled: false,
            onChange: () => null
        },
        retailPrice: {
            tag: 'input',
            type: 'number',
            name: 'retailPrice',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: false,
            onChange: () => null
        },
        wholesalePrice: {
            tag: 'input',
            type: 'number',
            name: 'wholesalePrice',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: false,
            onChange: () => null
        },
        purchasePrice: {
            tag: 'input',
            type: 'number',
            name: 'purchasePrice',
            className: 'fsControl inputData',
            step: 'any',
            min: null,
            disabled: false,
            onChange: () => null
        },
    },
    Clients: {
        id: {
            tag: 'input',
            className: 'fsControl id',
            name: 'id',
            disabled: true,
            onChange: () => null
        },
        name: {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        contact: {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        place: {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        }
    },
    Suppliers: {
        id: {
            tag: 'input',
            className: 'fsControl id',
            name: 'id',
            disabled: true,
            onChange: () => null
        },
        name: {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        contact: {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        place: {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        }
    },
    Orders: {
        id: {
            tag: 'input',
            className: 'fsControl id',
            name: 'id',
            disabled: true,
            onChange: () => null
        },
        supplierID: {
            tag: 'select',
            name: 'supplierID',
            className: 'fsControl inputData',
            step: null,
            min: null,
            choices: {
                options: "Suppliers"
            },
            disabled: false,
            heritable: 'notHeritable',
            onChange: () => null
        },
        expectedObtained: {
            tag: 'input',
            type: 'number',
            name: 'expectedObtained',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        },
        date: {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'fsControl inputData',
            disabled: false,
            onChange: () => null
        }
    }
}

export default modifyInTableInputs
