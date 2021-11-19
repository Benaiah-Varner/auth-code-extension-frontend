import { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { AuthStateContext } from '../utils/AuthState';
const clientId =
    '213652247095-mdls9h10rmgefj4qkf78mhmnu9l097lh.apps.googleusercontent.com';

function Logout() {
    const { setIsLoggedIn } = useContext(AuthStateContext);

    const onSuccess = () => {
        console.log('Logout made successfully');
        setIsLoggedIn(false)
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Logout;