const formVerification = {
    //  name: [required?, maxLength?]
    Sales: {
        clientID: [true, false],
        productID: [true, false],
        quantity: [true, 5],
        obtained: [true, false],
        profit: [true, false],
        discount: [true, false],
        type: [true, false],
        date: [true, false],
    },
    Clients: {
        name: [true, 25],
        contact: [false, 20],
        place: [false, 25]
    },
    Products: {
        orderID: [true, false],
        name: [true, 20],
        char1: [false, 15],
        char2: [false, 15],
        initialStock: [true, 6],
        retailPrice: [true, false],
        wholesalePrice: [true, false],
        purchasePrice: [true, false],
    },
    Orders: {
        supplierID: [true, false],
        expectedObtained: [true, false],
        date: [true, false],
    },
    Suppliers: {
        name: [true, 25],
        contact: [false, 20],
        place: [false, 20]
    },
};

export default formVerification
