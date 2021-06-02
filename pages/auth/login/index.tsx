import React, { useState } from 'react'
import { signIn, SignInResponse } from 'next-auth/client'
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response: SignInResponse = await signIn('credentials', { username: email, password, redirect: false });
        if (response.status === 200) {
            router.push('/home');
        } else {
            window && alert('Invalid Credentials')
        }
        setLoading(false);
    }
    return (
        <div>
            <form onSubmit={login}>
                <input type='email' name="email" placeholder='eg@eg.com' onChange={e => setEmail(e.target.value)} />
                <br />
                <input type='password' name="password" onChange={e => setPassword(e.target.value)} />
                <br />
                <button type='submit'>{loading ? "loading..." : "Login"}</button>
            </form>
        </div>
    )
}

export default Login
