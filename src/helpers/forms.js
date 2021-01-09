import calculateSale, { monitorProductSelects } from "./saleFormActions";

const forms = {
    Sales: {
        'ID': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'id',
            heritable: 'notHeritable'
        },
        'Cliente': {
            tag: 'select',
            name: 'clientID',
            className: 'form-control',
            placeholder: 'selecciona un cliente',
            divClass: 'col-md-12',
            step: null,
            min: null,
            choices: {
                url: `http://${process.env.REACT_APP_API_URL}/salesClients/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'Producto': {
            tag: 'select',
            name: 'productID',
            className: 'form-control',
            placeholder: 'selecciona un producto',
            divClass: 'col-md-12',
            step: null,
            min: null,
            choices: {
                url: `http://${process.env.REACT_APP_API_URL}/salesProducts/select`
            },
            disabled: false,
            heritable: 'heritable',
            onChange: (e) => {
                monitorProductSelects()
                calculateSale({target: e.target.parentNode.getElementsByTagName('input')[1]}, e.target.parentNode.parentNode.parentNode.parentNode)
            }
        },
        'Cantidad': {
            tag: 'input',
            type: 'number',
            name: 'quantity',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: 0,
            disabled: false,
            placeholder: 'unidades',
            heritable: 'heritable',
            onChange: (e) => calculateSale(e, e.target.parentNode.parentNode.parentNode)
        },
        'Obtenido': {
            tag: 'input',
            type: 'number',
            name: 'obtained',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: null,
            disabled: false,
            placeholder: '$',
            heritable: 'heritable',
            onChange: (e) => calculateSale(e, e.target.parentNode.parentNode.parentNode)
        },
        'Ganancia': {
            tag: 'input',
            type: 'number',
            name: 'profit',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: null,
            disabled: true,
            placeholder: '$',
            heritable: 'heritable'
        },
        'Descuento': {
            tag: 'input',
            type: 'number',
            name: 'discount',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: null,
            disabled: false,
            placeholder: '$',
            heritable: 'heritable',
            onChange: (e) => calculateSale(e, e.target.parentNode.parentNode.parentNode)
        },
        'Tipo': {
            tag: 'select',
            name: 'type',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            choices: {
                url: false,
                options: [
                    {
                        value: 'Detal',
                        label: 'Al detal'
                    },
                    {
                        value: 'Mayor',
                        label: 'Al mayor'
                    }
                ]
            },
            disabled: false,
            heritable: 'notHeritable',
            onChange: (e) => {
                const forms = document.getElementsByClassName('formToSend')
                for (let i = 0; i < forms.length; i++) {
                    const form = forms[i];
                    calculateSale(e, form)    
                }
            }
        },
        'Fecha': {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'fecha de la venta',
            heritable: 'notHeritable'
        },
    },
    Clients: {
        'ID': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'id',
            heritable: 'notHeritable'
        },
        'Nombre': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            divClass: 'col-md-12',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'nombre del cliente',
            heritable: 'heritable'
        },
        'Contacto': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'contacto del cliente',
            heritable: 'heritable'
        },
        'Lugar': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'ubicacion del cliente',
            heritable: 'notHeritable'
        }
    },
    Products: {
        'ID': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'id',
            heritable: 'notHeritable'
        },
        'Pedido': {
            tag: 'select',
            name: 'orderID',
            className: 'form-control',
            placeholder: 'selecciona un pedido',
            divClass: 'col-md-12',
            step: null,
            min: null,
            choices: {
                url: `http://${process.env.REACT_APP_API_URL}/productsOrders/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'Nombre': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            divClass: 'col-md-12',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'nombre del producto',
            heritable: 'notHeritable'
        },
        'Primera caracteristica': {
            tag: 'input',
            type: 'text',
            name: 'char1',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'caracteristica 1',
            heritable: 'heritable'
        },
        'Segunda caracteristica': {
            tag: 'input',
            type: 'text',
            name: 'char2',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'caracteristica 2',
            heritable: 'heritable'
        },
        'Cantidad inicial': {
            tag: 'input',
            type: 'number',
            name: 'initialStock',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: 0,
            disabled: false,
            placeholder: 'cantidad inicial',
            heritable: 'heritable'
        },
        'Precio al detal': {
            tag: 'input',
            type: 'number',
            name: 'retailPrice',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: 0,
            disabled: false,
            placeholder: 'precio al detal',
            heritable: 'notHeritable'
        },
        'Precio al mayor': {
            tag: 'input',
            type: 'number',
            name: 'wholesalePrice',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: 0,
            disabled: false,
            placeholder: 'precio al mayor',
            heritable: 'notHeritable'
        },
        'Precio compra': {
            tag: 'input',
            type: 'number',
            name: 'purchasePrice',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: 0,
            disabled: false,
            placeholder: 'precio compra',
            heritable: 'notHeritable'
        }
    },
    Orders: {
        'ID': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'id',
            heritable: 'notHeritable'
        },
        'Proveedor': {
            tag: 'select',
            name: 'supplierID',
            className: 'form-control inputData',
            placeholder: 'selecciona un proveedor',
            divClass: 'col-md-12',
            step: null,
            min: null,
            choices: {
                url: `http://${process.env.REACT_APP_API_URL}/ordersSuppliers/select`
            },
            disabled: false,
            heritable: 'notHeritable'
        },
        'Obtenido esperado': {
            tag: 'input',
            type: 'number',
            name: 'expectedObtained',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: 'any',
            min: 0,
            disabled: false,
            placeholder: 'obtenido esperado',
            heritable: 'notHeritable'
        },
        'Fecha de realizacion': {
            tag: 'input',
            type: 'date',
            name: 'date',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        }
    },
    Suppliers: {
        'ID': {
            tag: 'input',
            type: 'text',
            name: 'id',
            className: 'form-control d-none inputData',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'id',
            heritable: 'notHeritable'
        },
        'Nombre': {
            tag: 'input',
            type: 'text',
            name: 'name',
            className: 'form-control inputData',
            placeholder: 'nombre del proveedor',
            divClass: 'col-md-12',
            step: null,
            min: null,
            disabled: false,
            heritable: 'notHeritable'
        },
        'Contacto': {
            tag: 'input',
            type: 'text',
            name: 'contact',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'contacto',
            heritable: 'notHeritable'
        },
        'Lugar': {
            tag: 'input',
            type: 'text',
            name: 'place',
            className: 'form-control inputData',
            divClass: 'col-md-6',
            step: null,
            min: null,
            disabled: false,
            placeholder: 'ubicacion',
            heritable: 'notHeritable'
        }
    }
}

export default forms
