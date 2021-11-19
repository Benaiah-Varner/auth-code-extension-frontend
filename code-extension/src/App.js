/*global chrome*/
import { useEffect, useContext } from 'react';
import { createTheme, ThemeProvider, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Login from './components/Login';
import { useMemo } from 'react';
import AuthBox from './components/AuthBox';
import { AuthStateContext } from './utils/AuthState';
import Logout from './components/LogOut';

function App() {
  const { authCreds, isLoggedIn, latestMessage, setLatestMessage, getAuthCode } = useContext(AuthStateContext)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
        },
        typography: {
          h1: {
            fontSize: 16,
            fontWeight: 400,
          },
          body1: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: 18,
            letterSpacing: 2,
          },
        },
      }),
    []
  );

  useEffect(() => {
    if (isLoggedIn) {
      // setInterval(() => getAuthCode(), [3000]) 
      getAuthCode();
    }
  }, [authCreds, isLoggedIn])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display='flex' alignItems='center' flexDirection='column' width="300px" height="400px" justifyContent="center">
        {
          !isLoggedIn &&
          <Login setLatestMessage={setLatestMessage} />
        }
        {
          isLoggedIn &&
            <AuthBox latestMessage={latestMessage} />
        }
      </Box>
    </ThemeProvider >
  );
}

export default App;