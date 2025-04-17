import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { auth } from "../../config/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import "../styles/auth.css"


export default function AdminRegister() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Access setAuthData from context
    const { setAuthData } = useContext(AuthContext);

    // validation function for password to contain at least 8 characters and a number
    const validatePassword = (password) => {
        const hasNumber = /\d/;
        if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasNumber.test(password)) {
            return "Password must include at least one number.";
        }
        return null;
    };

    // login logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            const passwordError = validatePassword(password);
            if (passwordError) return setError(passwordError);
            if (password !== confirmPassword) return setError("Passwords do not match.");

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update global auth state via context
            setAuthData({
                userID: user.uid,
                name: user.email,
                isAuth: true,
            });

            navigate("/", { replace: false });
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
            <h1>line 1</h1>
                <div className="auth-content-wrapper">
                    { error && <p className="auth-signin-error">{error}</p> } 
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-wrapper">
                            <input 
                                className="auth-input" 
                                type="email" 
                                placeholder="Enter email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="auth-input-wrapper">
                            <input 
                                className="auth-input" 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Enter password" value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <FontAwesomeIcon 
                                icon={showPassword ? faEye : faEyeSlash} 
                                className='auth-eye' 
                                size='xl' 
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        <div className="auth-input-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="auth-input"
                                required
                            />
                                <FontAwesomeIcon 
                                    icon={showConfirmPassword ? faEye : faEyeSlash} 
                                    className='auth-eye' 
                                    size='xl' 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                        </div>
                        <button type="submit" className="auth-submit-btn">Register</button>
                    </form>       
                </div>
            </div>
        </div>
    );
}
