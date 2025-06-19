import React, { useState } from 'react';
import { loginUser,googleAuth } from '../services/auth.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/slice/AuthSlice.js';
import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            navigate("/dashboard");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const data=await googleAuth(credentialResponse.credential);
        dispatch(login(data.user)); 
        navigate("/dashboard");
    };

    const handleGoogleLoginError = () => {
        setError("Google Sign-In was unsuccessful. Try again.");
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-gray-900 shadow-lg rounded px-8 pt-6 pb-8 mb-4 border border-gray-800">
                <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Login</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-900 text-red-300 rounded-md border border-red-700">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        className="shadow appearance-none border border-gray-700 bg-gray-800 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        className="shadow appearance-none border border-gray-700 bg-gray-800 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                {/* Google Sign-In */}
                <div className="text-center mt-4">
                    <p className="text-gray-400 mb-2">OR</p>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                        width={380}
                    />
                </div>

                <div className="text-center mt-4">
                    <p className="cursor-pointer text-sm text-gray-400">
                        Don't have an account? <span onClick={() => state(false)} className="text-blue-400 hover:text-blue-300">Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
