const formVerification = {
    Sales: {
        clientID: ["Client ID", true, false],
        productID: ["Product ID", true, false],
        quantity: ["Quantity", true, 5],
        obtained: ["Obtained", true, false],
        profit: ["Profit", true, false],
        discount: ["Discount", true, false],
        type: ["Type", true, false],
        date: ["Date", true, false],
    },
    Clients: {
        name: ["Name", true, 25],
        contact: ["Contact", false, 20],
        place: ["Place", false, 25]
    },
    Products: {
        orderID: ["Order ID", true, false],
        name: ["Name", true, 20],
        char1: ["1st Feature", false, 15],
        char2: ["2nd Feature", false, 15],
        initialStock: ["Initial Stock", true, 6],
        retailPrice: ["Retail Price", true, false],
        wholesalePrice: ["Wholesale Price", true, false],
        purchasePrice: ["Purchase Price", true, false],
    },
    Orders: {
        supplierID: ["Supplier ID", true, false],
        expectedObtained: ["Expected Obtained", true, false],
        date: ["Date", true, false],
    },
    Suppliers: {
        name: ["Name", true, 25],
        contact: ["Contact", false, 20],
        place: ["Place", false, 20]
    },
};

export default formVerification