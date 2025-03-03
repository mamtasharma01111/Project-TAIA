const { Sequelize } = require("sequelize");

// Create a new Sequelize instance with the required dialect
const sequelize = new Sequelize("contact-form", "root", "root", {
    host: "localhost", // Change if using a remote database
    dialect: "mysql",  // Specify MySQL as the dialect
    logging: false,    // Disable logging (optional)
});

sequelize.authenticate()
    .then(() => {
        console.log("✅ MySQL Connected Successfully via Sequelize!");
    })
    .catch((err) => {
        console.error("❌ Unable to connect to the database:", err);
    });

module.exports = sequelize;
