import { DataTypes, Model } from "sequelize";
import { sequelizeUsers } from "../database/db.js";

class UserModel extends Model {}

UserModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		
		role: {
			type: String,
			enum: ['admin', 'seller', 'shopper'],
			default: 'shopper' // Default role is shopper
		},
	},
	{
		sequelize: sequelizeUsers,
		modelName: "users",
	},
);

export default UserModel;
