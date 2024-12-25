import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/LandingPage.css';
import { AuthState } from '../services/auth/types';

 
const LandingPage = ({
    isAuthenticated,
    authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            if (authState.user.role === 'shopper' || authState.user.role === 'seller') {
                navigate('/products');
            } else if (authState.user.role === 'admin') {
                navigate('/admin');
            }
        }
    }, [isAuthenticated, authState, navigate]);

    return (
        <>
            <Header />
            <div className="landing-page">
                <section className="hero-section">
                    <h1>Welcome to TravisCommerce</h1>
                    <p>Your one-stop shop for all your needs</p>
                    <button onClick={()=>navigate('/auth/login')}>Shop Now</button>
                </section>
           
                <section className="about-section">
                    <h2>About Us</h2>
                    <p>We aim to provide the best products at the best prices!</p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default LandingPage;
