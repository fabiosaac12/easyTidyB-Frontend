const translations = {
    en: {
	words: {
	    modify: 'Modify',
	    register: 'Register',
	    reset: 'Reset', Sales: 'Sales', Products: 'Products',
	    Clients: 'Clients',
	    Orders: 'Orders',
	    Suppliers: 'Suppliers',
	    Wholesale: 'Wholesale',
	    Retail: 'Retail',
	    actions: 'Actions'
	},
	graph: {
	    noSales: 'You don\'t have sales yet to display charts.',
	    noOrders: 'You don\'t have orders yet to display charts.',
	    noClients: 'You don\'t have clients yet to display charts.',
	    obtained: 'Obtained',
	    profit: 'Profits',
	    negativeProfit: 'Negative profits',
	    salesQuantity: 'Sales Quantity',
	    missing: 'Missing fot the expected obtained',
	    bought: 'Bought',
	    quantity: 'Quantity',
	    purchases: 'Purchases',
	    Sales: {
		title: 'Sales summary'
	    },
	    Orders: {
		title: 'Orders summary'
	    },
	    Clients: {
		title: 'Clients summary'
	    }

	},
	form: {
	    addSales: 'Add a sale',
	    addProducts: 'Add a product',
	    addClients: 'Add a client',
	    addOrders: 'Add an order',
	    addSuppliers: 'Add a supplier',
	    modifySales: 'Modify a sale',
	    modifyProducts: 'Modify a product',
	    modifyClients: 'Modify a client', 
	    modifyOrders: 'Modify an order', 
	    modifySuppliers: 'Modify a supplier',
	    labels: {
		id: 'ID',
		
		// Products
		orderID: 'Order',
		name: 'Name',
		char1: '1st characteristic',
		char2: '2nd characteristic',
		initialStock: 'Initial stock',
		retailPrice: 'Retail price',
		wholesalePrice: 'Wholesale price',
		purchasePrice: 'Purchase price',

		// Sales
		clientID: 'Client',
		productID: 'Product',
		quantity: 'Quantity',
		obtained: 'Obtained',
		profit: 'Profit',
		discount: 'Discount',
		type: 'Type',
		date: 'Date',
		
		// Suppliers & Clients
		contact: 'Contact',
		place: 'Location',

		// Orders
		supplierID: 'Supplier',
		expectedObtained: 'Expected obtained',
		orderDate: 'Done date',
	    },
	    placeholders: {
		id: 'id',
		
		// Products
		orderID: 'select an order',
		name: 'name',
		char1: 'first characteristic',
		char2: 'second characteristic',
		initialStock: 'initial stock',
		retailPrice: '$',
		wholesalePrice: '$',
		purchasePrice: '$',

		// Sales
		clientID: 'select a client',
		productID: 'select a product',
		quantity: 'product cuabtity',
		obtained: '$ obtained',
		profit: '$ profit',
		discount: '% discount',
		type: 'sale type',
		date: 'date',
		
		// Suppliers & Clients
		contact: 'contact',
		place: 'place',

		// Orders
		supplierID: 'select a supplier',
		expectedObtained: 'expected obtained',
		orderDate: 'order date',
	    }
	},
	aditionalForm: {
	    productPlaceholder: 'select a product'
	},
	alert: {
	    finishModification: 'Please, finish the current modification.',
	    sureToDeleteSales: 'Are you sure to delete the sale?',
	    sureToDeleteClients: 'Are you sure to delete the client? If you already have made sales to this client, first you have to delete those.',
	    sureToDeleteProducts: 'Are you sure to delete the product? If you already have made sales of this product, first you have to delete those.',
	    sureToDeleteOrders: 'Are you sure to delete the order? If you already have added products of this order, first you have to delete those.',
	    sureToDeleteSuppliers: 'Are you sure to delete the supplier? If you already have made orders to this supplier, first you have to delete those.',
	    sureToModifySales: 'Are you sure to modify the sale?',
	    sureToModifyClients: 'Are you sure to modify the client?',
	    sureToModifyProducts: 'Are you sure to modify the product?',
	    sureToModifyOrders: 'Are you sure to modify the order?',
	    sureToModifySuppliers: 'Are you sure to modify the supplier?',
	    operationInProcess: 'Please, wait; your operation is in process.',
	},
	corrections: {
	    wrongUserPass: 'Wrong username or password',
	    usernameNotAvailable: 'username unavailable',
	    nameUsed: (name) => `There is already a register called ${name}`,
	    isRequired: 'This is required',
	    maxLength: (num) => `Can't exceed ${num} characters`,
	    usernameRange: 'Must be between 7 and 15 characters',
	    noSpecialChars: 'Can\'t have special characters',
	    passRange: 'Must be between 8 and 30 characters',
	    numberRequired: 'Must have at least one number',
	    letterRequired: 'Must have at least one letter',
	    specialCharRequired: 'Must have at least one special character',
	    noMatch: 'Does not match',
	    notEnough: (available) => `Only ${available} product unities left`
	},
	log: {
	    user: 'Username',
	    pass: 'Password',
	    passConfirmation: 'Password confirmation',
	    haventAccount: 'Do not you have an account yet?',
	    haveAccount: 'Do you already have an account?',
	    logIn: 'Initialize me',
	    signUp: 'Register me',
	    logInTitle: 'Log in',
	    signUpTitle: 'Sign up'

	},
	popUpDiv: {
	    titleProducts: (name, char1, char2) => `Product: ${name} ${char1} ${char2}`,
	    titleSales: (client, date) => `Sale to ${client} at ${date}`,
	},
	searcher: {
	    placeholder: 'Search in table...'
	},
	table: {
	    noSales: 'You don\'t have sales yet.',
	    noProducts: 'You don\'t have products yet.',
	    noClients: 'You don\'t have clients yet.',
	    noOrders: 'You don\'t have orders yet.',
	    noSuppliers: 'You don\'t have suppliers yet.',
	},
	columns: {
	    id: 'ID',
	    
	    // Products
	    orderID: 'Order',
	    order: 'Order',
	    name: 'Name',
	    char1: '1st Char.',
	    char2: '2nd Char.',
	    initialStock: 'Initial stock',
	    available: 'Available',
	    sold: 'Sold',
	    retailPrice: 'RP',
	    wholesalePrice: 'WP',
	    purchasePrice: 'PP',
	    profit: 'Profits',
	    invested: 'Invested',

	    // Sales
	    clientID: 'Client',
	    client: 'Client',
	    productID: 'Product',
	    product: 'Product',
	    quantity: 'Quantity',
	    obtained: 'Obtained',
	    discount: 'Discount',
	    type: 'Type',
	    date: 'Date',
	    
	    // Suppliers & Clients
	    contact: 'Contact',
	    place: 'Location',
	    purchases: 'Purchases',
	    lastPurchase: 'Last purchase',
	    firstPurchase: 'First purchase',
	    bought: 'Bought',

	    // Orders
	    supplier: 'Supplier',
	    supplierID: 'Supplier',
	    expectedObtained: 'Expected obtained',
	},
	welcome: {
	    description1: 'Just come in and add your products and sales.',
	    description2: 'You will be able to always be informed about your profits, loses, clients and more, all will be made automatically. You always will be able to know what is going good and what is not.',
	    description3: 'Maintain in order your business.',
	    howMadeTitle: 'How is this app made?',
	    frontendR: 'Frontend repository (GitHub)',
	    apiR: 'API repository (GitHub)',
	    dbR: 'Database repository (GitHub)'
	},
	nav: {
	    switchLang: 'Cambiar idioma',
	    logOut: 'Go out'
	}

    },
    es: {
	words: {
	    modify: 'Modificar',
	    register: 'Registrar',
	    reset: 'Resetear',
	    Sales: 'Ventas',
	    Products: 'Productos',
	    Clients: 'Clientes',
	    Orders: 'Pedidos',
	    Suppliers: 'Proveedores',
	    Wholesale: 'Al mayor',
	    Retail: 'Al detal',
	    actions: 'Acciones'
	},
	graph: {
	    noSales: 'Aún no tienes ventas para mostrar gráficas.',
	    noOrders: 'Aún no tienes pedidos para mostrar gráficas.',
	    noClients: 'Aún no tienes clientes para mostrar gráficas.',
	    obtained: 'Obtenido',
	    profit: 'Ganancias',
	    negativeProfit: 'Ganancias negativas',
	    salesQuantity: 'Cantidad de ventas',
	    missing: 'Faltante para el esperado',
	    bought: 'Comprado',
	    quantity: 'Cantidad',
	    purchases: 'Compras',
	    Sales: {
		title: 'Resumen de ventas'
	    },
	    Orders: {
		title: 'Resumen de pedidos'
	    },
	    Clients: {
		title: 'Resumen de clientes'
	    }

	},
	form: {
	    addSales: 'Agregar una venta',
	    addProducts: 'Agregar un producto',
	    addClients: 'Agregar un cliente',
	    addOrders: 'Agregar un pedido',
	    addSuppliers: 'Agregar un proveedor',
	    modifySales: 'Agregar una venta',
	    modifyProducts: 'Agregar un producto',
	    modifyClients: 'Agregar un cliente', modifyOrders: 'Agregar un pedido', modifySuppliers: 'Agregar un proveedor',
	    labels: {
		id: 'ID',
		
		// Products
		orderID: 'Pedido',
		name: 'Nombre',
		char1: '1.º característica',
		char2: '2.º característica',
		initialStock: 'Cantidad Inicial',
		retailPrice: 'Precio al detal',
		wholesalePrice: 'Precio al mayor',
		purchasePrice: 'Precio compra',

		// Sales
		clientID: 'Cliente',
		productID: 'Producto',
		quantity: 'Cantidad',
		obtained: 'Obtenido',
		profit: 'Ganancia',
		discount: 'Descuento',
		type: 'Tipo',
		date: 'Fecha',
		
		// Suppliers & Clients
		contact: 'Contacto',
		place: 'Lugar',

		// Orders
		supplierID: 'Proveedor',
		expectedObtained: 'Obtenido esperado',
		orderDate: 'Fecha de realizacion',
	    },
	    placeholders: {
		id: 'id',
		
		// Products
		orderID: 'selecciona un pedido',
		name: 'nombre',
		char1: 'primera caracteristica',
		char2: 'segunda característica',
		initialStock: 'cantidad inicial',
		retailPrice: '$',
		wholesalePrice: '$',
		purchasePrice: '$',

		// Sales
		clientID: 'selecciona un cliente',
		productID: 'selecciona un producto',
		quantity: 'cantidad del producto',
		obtained: '$ obtenido',
		profit: '$ ganancia',
		discount: '% descuento',
		type: 'tipo de venta',
		date: 'fecha',
		
		// Suppliers & Clients
		contact: 'contacto',
		place: 'ubicacion',

		// Orders
		supplierID: 'selecciona un proveedor',
		expectedObtained: 'obtenido esperado',
		orderDate: 'fecha de pedido',
	    }
	},
	aditionalForm: {
	    productPlaceholder: 'selecciona un producto'
	},
	alert: {
	    finishModification: 'Termina la modificación actual.',
	    sureToDeleteSales: '¿Estás seguro de eliminar la venta?',
	    sureToDeleteClients: '¿Estás seguro de eliminar el cliente? Si ya le has hecho ventas a este cliente tendrás que eliminarlas primero.',
	    sureToDeleteProducts: '¿Estás seguro de eliminar el producto? Si ya has hecho ventas de este producto tendrás que eliminarlas primero.',
	    sureToDeleteOrders: '¿Estás seguro de eliminar el pedido? Si ya has añadido productos de este pedido tendrás que eliminarlos primero.',
	    sureToDeleteSuppliers: '¿Estás seguro de eliminar el proveedor? Si ya has hecho pedidos a este proveedor tendrás que eliminarlos primero.',
	    sureToModifySales: '¿Estás seguro de modificar la venta?',
	    sureToModifyClients: '¿Estás seguro de modificar el cliente?',
	    sureToModifyProducts: '¿Estás seguro de modificar el producto?',
	    sureToModifyOrders: '¿Estás seguro de modificar el pedido?',
	    sureToModifySuppliers: '¿Estás seguro de modificar el proveedor?',
	    operationInProcess: 'Su operación está en proceso',
	},
	corrections: {
	    wrongUserPass: 'Usuario o contraseña incorrecto',
	    usernameNotAvailable: 'Nombre de usuario no disponible',
	    nameUsed: (name) => `Ya hay un registro llamado ${name}`,
	    isRequired: 'Es requerido',
	    maxLength: (num) => `No puede superar los ${num} carácteres`,
	    usernameRange: 'Debe contener entre 7 y 15 carácteres',
	    noSpecialChars: 'No puede contener carácteres especiales',
	    passRange: 'Debe contener entre 8 y 30 carácteres',
	    numberRequired: 'Debe contener al menos un número',
	    letterRequired: 'Debe contener al menos una letra',
	    specialCharRequired: 'Debe contener al menos un carácter especial',
	    noMatch: 'No coincide',
	    notEnough: (available) => `Solo quedan ${available} unidades del producto`
	},
	log: {
	    user: 'Nombre de usuario',
	    pass: 'Contraseña',
	    passConfirmation: 'Confirmación de contraseña',
	    haventAccount: '¿No tienes una cuenta?',
	    haveAccount: '¿Ya tienes una cuenta?',
	    logIn: 'Iniciarse',
	    signUp: 'Registrarse',
	    logInTitle: 'Iniciar sesión',
	    signUpTitle: 'Crear una cuenta'
	},
	popUpDiv: {
	    titleProducts: (name, char1, char2) => `Producto: ${name} ${char1} ${char2}`,
	    titleSales: (client, date) => `Venta a ${client} el ${date}`,
	},
	searcher: {
	    placeholder: 'Buscar en la tabla...'
	},
	table: {
	    noSales: 'Aún no tienes ventas.',
	    noProducts: 'Aún no tienes productos.',
	    noClients: 'Aún no tienes clientes.',
	    noOrders: 'Aún no tienes pedidos.',
	    noSuppliers: 'Aún no tienes proveedores.',
	},
	columns: {
	    id: 'ID',
	    
	    // Products
	    orderID: 'Pedido',
	    order: 'Pedido',
	    name: 'Nombre',
	    char1: '1.º Caract.',
	    char2: '2.º Caract.',
	    initialStock: 'Cantidad Inicial',
	    available: 'Disponibles',
	    sold: 'Vendidos',
	    retailPrice: 'PD',
	    wholesalePrice: 'PM',
	    purchasePrice: 'PC',
	    profit: 'Ganancias',
	    invested: 'Invertido',

	    // Sales
	    clientID: 'Cliente',
	    client: 'Cliente',
	    productID: 'Producto',
	    product: 'Producto',
	    quantity: 'Cantidad',
	    obtained: 'Obtenido',
	    discount: 'Descuento',
	    type: 'Tipo',
	    date: 'Fecha',
	    
	    // Suppliers & Clients
	    contact: 'Contacto',
	    place: 'Lugar',
	    purchases: 'Compras',
	    lastPurchase: 'Última compra',
	    firstPurchase: 'Primera compra',
	    bought: 'Comprado',

	    // Orders
	    supplier: 'Proveedor',
	    supplierID: 'Proveedor',
	    expectedObtained: 'Obtenido esperado',
	},
	welcome: {
	    description1: 'Tan solo entra y añade tus productos y ventas.',
	    description2: 'Podrás mantenerte siempre al tanto de tus ganancias, pérdidas, clientes y demás, todo se realizará automáticamente. Siempre podrás saber qué va bien y qué no.',
	    description3: 'Manten a tu negocio organizado.',
	    howMadeTitle: '¿Cómo está hecha esta aplicación?',
	    frontendR: 'Repositorio del Frontend (GitHub)',
	    apiR: 'Repositorio de la API (GitHub)',
	    dbR: 'Repositorio de la base de datos (GitHub)'
	},
	nav: {
	    switchLang: 'Switch language',
	    logOut: 'Salir'
	}

    }
}

export default translations
