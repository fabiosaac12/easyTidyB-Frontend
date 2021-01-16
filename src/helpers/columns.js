const columns = {
    detailed: {
        Sales: {
            a: ['id', true],
            b: ['clientID'],
            c: ['producID'],
            d: ['quantity'],
            e: ['obtained'],
            f: ['profit'],
            g: ['discount'],
            h: ['type'],
            i: ['date']
        },
        Clients: {
            a: ['id', true],
            b: ['name'],
            c: ['contact'],
            d: ['place'],
            e: ['bought'],
            f: ['profit'],
            g: ['purchases'],
            h: ['lastPurchase'],
            i: ['firstPurchase']
        },
        Products: {
            a: ['id', true],
            b: ['orderID', true],
            c: ['name'],
            d: ['char1'],
            e: ['char2'],
            f: ['initialStock'],
            g: ['available'],
            h: ['sold'],
            i: ['retailPrice'],
            j: ['wholesalePrice'],
            k: ['purchasePrice'],
            l: ['obtained'],
            m: ['profit'],
            n: ['invested']
        },
        Orders: {
            a: ['id', true],
            b: ['supplier'],
            c: ['supplierID', true],
            d: ['expectedObtained'],
            e: ['obtained'],
            f: ['profit'],
            g: ['invested'],
            h: ['initialStock'],
            i: ['date'],
        },
        Suppliers: {
            a: ['id', true],
            b: ['name'],
            c: ['contact'],
            d: ['place'],
            e: ['purchases'],
            f: ['obtained'],
            g: ['profit'],
            h: ['invested'],
            i: ['lastPurchase'],
            j: ['firstPurchase']
        }
    },
    grouped: {
        Sales: {
            a: ['client'],
            b: ['obtained'],
            c: ['profit'],
            d: ['discount'],
            e: ['type'],
            f: ['date'],
        },
        Products: {
            a: ['name'],
            b: ['char1'],
            c: ['char2'],
            d: ['available'],
            e: ['retailPrice'],
            f: ['wholesalePrice'],
            g: ['purchasePrice']
        }
    },
    equal: {
        Sales: {
            a: ['id', true],
            b: ['clientID', true],
            c: ['client', true],
            d: ['productID', true],
            e: ['product'],
            f: ['quantity'],
            g: ['obtained'],
            h: ['profit'],
            i: ['discount'],
            k: ['type', true],
            l: ['date', true],
            m: ['orderID', true]
        },
        Products: {
            a: ['id', true], 
            b: ['orderID', true],
            c: ['order'],
            d: ['name', true],
            e: ['char1', true],
            f: ['char2', true],
            g: ['initialStock'],
            h: ['available'],
            i: ['sold'],
            j: ['retailPrice'],
            k: ['wholesalePrice'],
            l: ['purchasePrice'],
            m: ['obtained'],
            n: ['profit'],
            o: ['invested'],
        }
    }
 }

 export default columns
