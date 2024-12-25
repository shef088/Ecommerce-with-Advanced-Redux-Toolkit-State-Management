import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authenticationRoutes.js";
import morgan from "morgan";
import productControlRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const config = process.env;

import cors from "cors";

const PORT = 4040;
const app = express();

app.use(morgan("dev"));
app.use(cookieParser(config.TOKEN));

const corsOptions = {
	// Add your address here i.e. your forwarded address from a cloud environment
	origin: [
		"http://127.0.0.1:5173",
		"http://127.0.0.1:4173",
		"http://localhost:5173",
		"http://localhost:4173",
		"http://[::1]:4173",
		"http://[::1]:5173",
		"https://reimagined-guide-q6x74vpgrr4f99q-5173.app.github.dev",//replace with your frontend url
	],
	credentials: true, //included credentials as true
	preflightContinue: false,
};

app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Origin, X-Requested-With,content-type,Content-Type, Authorization,Authentication,withCredentials, Content-Length, X-Requested-With, Accept, x-access-token,credentials, Origin, X-Content-Type-Options",
	);
	res.header(
		"Access-Control-Expose-Headers",
		"x-access-token, Authorization, Authentication, withCredentials, credentials, Set-Cookie",
	);
	res.header("Access-Control-Allow-Credentials", true);

	// You might want to hard-code this if necessary.
	const origin = req.get("origin") || req.get("referer");
	res.header("Access-Control-Allow-Origin", origin);

	next();
});

app.use(express.json());

// Set Cors Options before other routes for all possible routes, enabling preflight across the board
app.options("*", cors(corsOptions));

app.use("/api/auth/", authRoute);
app.use("/api/products/", productControlRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes); //
try {
	app.listen(PORT, () =>
		console.log(`Connected and listening on port ${PORT}.`),
	);
} catch (err) {
	console.log(`Failed to start the server with error: ${err}`);
}
