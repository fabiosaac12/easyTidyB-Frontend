const columns = {
    detailed: {
        Sales: {
            a: ['id', 'ID', true],
            b: ['clientID', 'Cliente'],
            c: ['producID', 'Producto'],
            d: ['quantity', 'Cantidad'],
            e: ['obtained', 'Obtenido'],
            f: ['profit', 'Ganancia'],
            g: ['discount', 'Descuento'],
            h: ['type', 'Tipo'],
            i: ['date', 'Fecha']
        },
        Clients: {
            a: ['id', 'ID', true],
            b: ['name', 'Nombre'],
            c: ['contact', 'Contacto'],
            d: ['place', 'Lugar'],
            e: ['bought', 'Comprado'],
            f: ['profit', 'Ganancias'],
            g: ['purchases', 'Compras'],
            h: ['lastPurchase', 'Ultima compra'],
            i: ['firstPurchase', 'Primera compra']
        },
        Products: {
            a: ['id', 'ID', true],
            b: ['orderID', 'Pedido', true],
            c: ['name', 'Nombre'],
            d: ['char1', '1* Caracteristica'],
            e: ['char2', '2* Caracteristica'],
            f: ['initialStock', 'Cantidad inicial'],
            g: ['available', 'Disponibles'],
            h: ['sold', 'Vendidos'],
            i: ['retailPrice', 'PD'],
            j: ['wholesalePrice', 'PM'],
            k: ['purchasePrice', 'PC'],
            l: ['obtained', 'Obtenido'],
            m: ['profit', 'Ganancias'],
            n: ['invested', 'Invertido']
        },
        Orders: {
            a: ['id', 'ID', true],
            b: ['supplier', 'Proveedor'],
            c: ['supplierID', 'Proveedor', true],
            d: ['expectedObtained', 'Obtenido Esperado'],
            e: ['obtained', 'Obtenido'],
            f: ['profit', 'Ganancias'],
            g: ['invested', 'Invertido'],
            h: ['initialStock', 'Cantidad Inicial'],
            i: ['date', 'Fecha'],
        },
        Suppliers: {
            a: ['id', 'ID', true],
            b: ['name', 'Nombre'],
            c: ['contact', 'Contacto'],
            d: ['place', 'Lugar'],
            e: ['purchases', 'Compras'],
            f: ['obtained', 'Obtenido'],
            g: ['profit', 'Ganancias'],
            h: ['invested', 'Invertido'],
            i: ['lastPurchase', 'Ultima Compra'],
            j: ['firstPurchase', 'Primera Compra']
        }
    },
    grouped: {
        Sales: {
            a: ['client', 'Cliente'],
            b: ['obtained', 'Obtenido'],
            c: ['profit', 'Ganancia'],
            d: ['discount', 'Descuento'],
            e: ['type', 'Tipo'],
            f: ['date', 'Fecha'],
        },
        Products: {
            a: ['name', 'Nombre'],
            b: ['char1', '1* Caract.'],
            c: ['char2', '2* Caract.'],
            d: ['available', 'Disponibles'],
            e: ['retailPrice', 'PD'],
            f: ['wholesalePrice', 'PM'],
            g: ['purchasePrice', 'PC']
        }
    },
    equal: {
        Sales: {
            a: ['id', 'ID', true],
            b: ['clientID', 'Cliente', true],
            c: ['client', 'Cliente', true],
            d: ['productID', 'Producto', true],
            e: ['product', 'Producto'],
            f: ['quantity', 'Cantidad'],
            g: ['obtained', 'Obtenido'],
            h: ['profit', 'Ganancia'],
            i: ['discount', 'Descuento'],
            k: ['type', 'Tipo', true],
            l: ['date', 'Fecha', true],
            m: ['orderID', 'ID Pedido', true]
        },
        Products: {
            a: ['id', 'ID', true], 
            b: ['orderID', 'Pedido', true],
            c: ['order', 'Pedido'],
            d: ['name', 'Nombre', true],
            e: ['char1', '1* Caract.', true],
            f: ['char2', '2* Caract.', true],
            g: ['initialStock', 'Cantidad Inicial'],
            h: ['available', 'Disponibles'],
            i: ['sold', 'Vendidos'],
            j: ['retailPrice', 'PD'],
            k: ['wholesalePrice', 'PM'],
            l: ['purchasePrice', 'PP'],
            m: ['obtained', 'Obtenido'],
            n: ['profit', 'Ganancias'],
            o: ['invested', 'Invertido'],
        }
    }
 }

 export default columns
