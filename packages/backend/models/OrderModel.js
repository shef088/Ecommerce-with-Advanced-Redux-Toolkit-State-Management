import { DataTypes, Model } from "sequelize";
import { sequelizeOrders } from "../database/db.js"; // Your sequelize instance

class OrderModel extends Model {}
OrderModel.init( {
    userId: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    orderItems: {
        type: DataTypes.JSONB, 
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "completed", 
    },
}, 
{
  sequelize: sequelizeOrders, 
  modelName: "Order", 
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

export default OrderModel;
