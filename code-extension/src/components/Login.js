/* eslint-disable no-undef */
import { useContext, useState } from 'react';
import { AuthStateContext } from '../utils/AuthState';
import { GoogleLogin } from 'react-google-login';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { CLIENT_ID } from '../redirects';
const scopes = 'https://mail.google.com/'

function loadScript(url) {
    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status !== 200) {
            return;
        }

        eval(request.responseText);
    };

    request.open('GET', url);
    request.send();
}

function Login() {
    const { setAuthCreds, setIsLoggedIn } = useContext(AuthStateContext);
    const [error, setError] = useState()
    const tokenObj = {}

    const login = () => {
        const authUrl = 'https://accounts.google.com/o/oauth2/auth'
            + '?response_type=token&client_id=' + CLIENT_ID
            + '&scope=' + scopes
            + '&redirect_uri=https://nfpojngenkljbemhbcecchnbgfnklkol.chromiumapp.org'

        chrome.identity.launchWebAuthFlow({ 'url': authUrl, 'interactive': true }, function (redirectUrl) {
            if (redirectUrl) {
                console.log('launchWebAuthFlow login successful: ', redirectUrl);
                const splitUrl = redirectUrl.split('#')[1].split('&')
                splitUrl.forEach((item) => {
                    const split = item.split('=')
                    tokenObj[split[0]] = split[1]
                })
                console.log('in func ', tokenObj)
                setAuthCreds(tokenObj)
                setIsLoggedIn(true)
                console.log('Background login complete');
                return redirectUrl
            } else {
                setError('Unable to log in, please try again or let Benaiah know')
                console.log("launchWebAuthFlow login failed. Is your redirect URL (https://nfpojngenkljbemhbcecchnbgfnklkol.chromiumapp.org) configured with your OAuth2 provider?");
                return (null);
            }
        });
    }

    return (
        <div>
            <Button onClick={login} variant="contained">
                {error ?? 'Login'}
            </Button>
        </div>
    );
}

export default Login;
/* eslint-enable no-undef */