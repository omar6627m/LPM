"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const correctPassword = 'your_hardcoded_password';

    const handleLogin = () => {
        if (password === correctPassword) {
            // Save login state (e.g., using cookies, local storage, or a state management library)
            // Redirect the user to the desired page
            // TODO: Use Zustand to save user state
            router.push('/');
        }
    };

    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
