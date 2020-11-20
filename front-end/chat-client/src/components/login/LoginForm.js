import React, { useState } from "react"
import { Redirect } from "react-router-dom"

function LoginForm({ authenticated, login, location,setUsername, setAuthentication }) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {

        try {
            const user = login({ name, password });
            console.log(user);
            // console.log(setUsername(name));
        } catch (e) {
            alert("Failed to login")
            setName("")
            setPassword("")
        }
    }

    const { from } = location || { from: { pathname: "/" } }
    if (authenticated) return <Redirect to={from} />

    return (
        <>
            <h1>Login</h1>
            <input
                value={name}
                onChange={({ target: { value } }) => setName(value)}
                type="text"
                placeholder="name"
            />
            <input
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                type="password"
                placeholder="password"
            />
            <button onClick={handleClick}>Login</button>
        </>
    )
}

export default LoginForm