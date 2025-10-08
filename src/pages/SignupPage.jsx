import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BubbleAnimation from '../components/BubbleAnimation'; // Assuming BubbleAnimation is created as a separate component
import { BACKEND_SERVER_URL } from '../utils/config';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation for email and password matching
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        // Proceed with form submission (sending a request to the server)
        try {
            const res = await fetch(`${BACKEND_SERVER_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // Set correct Content-Type for JSON
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            const data = await res.json();  // Make sure to await the JSON response
    
            console.log(data);
    
            if (res.ok) {
                navigate('/login');  // Navigate to login page on success
                setError('');  // Clear any error messages
            } else {
                setError(data.error || "An error occurred");  // Display the error from the response
            }
        } catch (error) {
            console.error(error);
            setError(error.message || "An unexpected error occurred");  // Handle any unexpected errors
        }
    };
    

    return (
        <div className="relative w-full h-screen">
            {/* Bubble Animation as the background */}
            <BubbleAnimation /> {/* Bubble animation component */}

            <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
                <div className="w-full max-w-md bg-transparent rounded-lg shadow-xl shadow-gray-500 dark:bg-transparent dark:border-gray-700 p-8 space-y-6">
                    <Link to="/" className="max-w-fit p-2 rounded-md flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" />
                        RetailEdge
                    </Link>

                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>

                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input
                                type="password"
                                name="confirm-password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    aria-describedby="terms"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="font-light text-black">
                                    I accept the{' '}
                                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Terms and Conditions
                                    </button>
                                </label>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full text-purple-800 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Create an account
                        </button>

                        {/* Login Redirect */}
                        <p className="text-sm font-light text-blue-800 bg-slate-300 rounded-full p-3">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default SignupPage;
