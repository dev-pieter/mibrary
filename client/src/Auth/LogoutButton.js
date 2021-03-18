import React from 'react'
import { GoogleLogout } from 'react-google-login';

export default function LogoutButton({auth}) {
    const logout = (response) => {
        auth({shelves: [], loggedIn: false})
    }

    return (
        <button style={{borderRadius: '5px', color : 'white', background: 'none', border: '1px solid white'}} onClick={logout}>Logout</button>
    )
}
