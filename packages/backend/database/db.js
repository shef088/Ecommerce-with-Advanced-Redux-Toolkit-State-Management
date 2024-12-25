import { Sequelize } from "sequelize";

const sequelizeUsers = new Sequelize({
	database: "users",
	dialect: "sqlite",
	storage: "./database/users.sqlite",
	logging: false,
});

sequelizeUsers
	.authenticate()
	.then(async () => {
		await sequelizeUsers
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for users db"));
		console.log("Connection established for users db");
	})
	.catch((err) => console.error("Unable to connect to users database: ", err));

	// Define the database connection for the products database
const sequelizeProducts = new Sequelize({
	database: "products",
	dialect: "sqlite",
	storage: "./database/products.sqlite",
	logging: false,
  });
  
  // Authenticate and sync the products database
  sequelizeProducts
	.authenticate()
	.then(async () => {
	  await sequelizeProducts
		.sync({ alter: true })
		.then(() => console.log("Database is synchronised for products db"));
	  console.log("Connection established for products db");
	})
	.catch((err) => console.error("Unable to connect to products database: ", err));

	
// Define the database connection for the orders database
const sequelizeOrders = new Sequelize({
    database: "orders",
    dialect: "sqlite",
    storage: "./database/orders.sqlite",
    logging: false,
});

// Authenticate and sync the orders database
sequelizeOrders
    .authenticate()
    .then(async () => {
        await sequelizeOrders
            .sync({ alter: true }) // You can remove this line if you don't want to sync the orders table schema
            .then(() => console.log("Database is synchronised for orders db"));
        console.log("Connection established for orders db");
    })
    .catch((err) => console.error("Unable to connect to orders database: ", err));

export {  sequelizeUsers, sequelizeProducts, sequelizeOrders };
