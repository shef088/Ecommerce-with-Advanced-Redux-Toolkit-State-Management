// models/ProductModel.js

import { DataTypes, Model } from "sequelize";
import { sequelizeProducts } from "../database/db.js"; // Adjust based on your database setup

class ProductModel extends Model {}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure product names are unique
    },
    price: {
      type: DataTypes.FLOAT, // To allow decimal values
      allowNull: false,
      validate: {
        min: 0, // Validate that price is not negative
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Ensure quantity cannot be negative
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Optional description
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Foreign key from seller (user with 'seller' role)
    
    },
    imageUrl: {
      type: DataTypes.STRING, // or TEXT if storing a large string path
      allowNull: false, 
      defaultValue: "",
  },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeProducts, 
    modelName: "Product", 
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);
// await ProductModel.sync({ alter: true }); //rerun the migration or sync the database 
export default ProductModel;
