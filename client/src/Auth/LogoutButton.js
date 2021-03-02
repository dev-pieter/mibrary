import React from 'react'
import { GoogleLogout } from 'react-google-login';

export default function LogoutButton({auth}) {
    const logout = (response) => {
        auth({token: 0 ,loggedIn: false})
    }

    return (
        <GoogleLogout
            clientId="512409493412-p8em5bgu9urlf0hg0gpn0qj7fssd9pis.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
        />
    )
}
