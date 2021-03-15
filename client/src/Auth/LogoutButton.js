import React from 'react'
import { GoogleLogout } from 'react-google-login';

export default function LogoutButton({auth}) {
    const logout = (response) => {
        auth({token: 0 ,loggedIn: false})
    }

    return (
        <button onClick={logout}>Logout</button>
    )
}
