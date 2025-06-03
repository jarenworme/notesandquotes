import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { auth } from "../../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../../context/AuthContext";
import "../../styles/auth.css"


export default function AdminLogin() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // navigation functions
    const navigateForgotPassword = () => navigate('/forgotPassword', { replace: false });

    // state variables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Access setAuthData from context
    const { setAuthData } = useContext(AuthContext);

    // login logic
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
                        <button type="button" className="auth-forgot-password-btn">forgot password?</button>
                        <button type="submit" className="auth-submit-btn" onClick={navigateForgotPassword}>Login</button>
                    </form>       
                </div>
            </div>
        </div>
    );
}
