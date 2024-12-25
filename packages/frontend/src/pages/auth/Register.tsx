import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../services/auth/authSlice";
import type { RegisterRequest } from "../../services/auth/types";
import "../../styles/Register.css"
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { toast } from 'react-toastify';

const Register = ({
	isAuthenticated,
}: { isAuthenticated: boolean }) => {
	const navigate = useNavigate();
	const [register, { isLoading }] = useRegisterMutation();
	const [registerFormData, setRegisterFormData] = useState<RegisterRequest>({
    	username: "",
    	email: "",
    	password: "",
	});

	return (
		<>
		<Header />
    	<div className="register-card">
        	{!isAuthenticated && (
            	<>
                	<h2>Register to our blogging platform</h2>
                	<form
                    	className="register-form"
                    	onSubmit={(e) => {
                        	e.preventDefault();
                        	try {
                            	register(registerFormData)
                                	.then((data) => {
                                    	if (data?.data?.ok) {
											toast.success("Registration Sucessful")
											toast.success("Login now!")
                                        	return navigate("/auth/login");
                                    	}
										toast.error("Invalid credentials!");
                                	})
                                	.catch(() =>
										toast.error("Server error! Please file a bug report!"),
                                	);
                        	} catch (err) {
								toast.error(`Failed to register; got ${err}`);
                        	}
                    	}}
                	>
                    	<input
                        	id="username"
                        	placeholder="Username"
                        	type="text"
                        	value={registerFormData.username}
                        	onChange={(e) =>
                            	setRegisterFormData({
                                	...registerFormData,
                                	username: e.target.value,
                            	})
                        	}
                    	/>
                    	<input
                        	id="email"
                        	placeholder="Email"
                        	type="email"
                        	value={registerFormData.email}
                        	onChange={(e) =>
                            	setRegisterFormData({
                                	...registerFormData,
                                	email: e.target.value,
                            	})
                        	}
                    	/>
                    	<input
                        	id="password"
                        	type="password"
                        	placeholder="Password"
                        	value={registerFormData.password}
                        	onChange={(e) =>
                            	setRegisterFormData({
                                	...registerFormData,
                                	password: e.target.value,
                            	})
                        	}
                    	/>
                    	<button type="submit">
                        	{isLoading ? "Registering..." : "Register"}
                    	</button>
                	</form>
					<br/>
						<span>Already have an account? <Link to="/auth/login">Login</Link> </span>
              
            	</>
        	)}
    	</div>
		<Footer />
		</>
	);
};

export default Register;
