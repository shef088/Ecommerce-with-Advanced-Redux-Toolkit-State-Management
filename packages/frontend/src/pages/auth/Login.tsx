import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useLoginMutation } from "../../services/auth/authSlice";
import type { AuthState, LoginRequest } from "../../services/auth/types";
import "../../styles/Login.css"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { toast } from 'react-toastify';

const Login = ({
	isAuthenticated,
	authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();
	const [loginFormData, setLoginFormData] = useState<LoginRequest>({
    	email: "",
    	password: "",
	});

	return (
		<>
		<Header />
	
    	<div className="login-card">
        	{isAuthenticated ? (
            	<h3>You are logged in {authState?.user?.username}.</h3>
        	) : (
            	<>
                	<h2>Login to our Ecommerce platform</h2>
                	<form
                    	className="login-form"
                    	onSubmit={(e) => {
                        	e.preventDefault();
                        	try {
                            	login(loginFormData)
                                	.then((data) => {
                                    	if (data?.data?.ok) {
                                        	return navigate("/", {
                                            	replace: true,
                                        	});
                                    	}
                                    	console.log("data error msg:", data)
										toast.error("Invalid credentials!");
                                	})
                                	.catch(() =>
                                    	toast.error("Server error! Please file a bug report!"),
                                	);
                        	} catch (err) {
                            	toast.error(`Failed to login; got ${err}`);
                        	}
                    	}}
                	>
                    	<input
                        	id="email"
                        	placeholder="Email"
                        	type="email"
                        	value={loginFormData.email}
                        	onChange={(e) =>
                            	setLoginFormData({ ...loginFormData, email: e.target.value })
                        	}
                    	/>
                    	<input
                        	id="password"
                        	type="password"
                        	placeholder="Password"
                        	value={loginFormData.password}
                        	onChange={(e) =>
                            	setLoginFormData({ ...loginFormData, password: e.target.value })
                        	}
                    	/>
                    	<div className="buttons">
                        	<button type="submit">
                            	{isLoading ? "Logging in..." : "Login"}
                        	</button>
                    	</div>
						<br/>
						<span>Don't have an account? <Link to="/auth/register">Signup</Link> </span>
                	</form>
            	</>
        	)}
    	</div>
		<Footer />
		</>
	);
};

export default Login;
