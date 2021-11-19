import { createContext, useState, useEffect } from "react";
import axios from 'axios';
export const AuthStateContext = createContext();
const AuthStateProvider = AuthStateContext.Provider

function AuthState(props) {
    const [authCreds, setAuthCreds] = useState()
    const [latestMessage, setLatestMessage] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [date, setDate] = useState()
    const [email, setEmail] = useState()
    const [code, setCode] = useState()

    const getAuthCode = () => {
        axios.post('http://localhost:3001/api/messages', { tokenObj: authCreds }, {
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
                'Content-Type': 'application/json',
            }
        }).then((res) => res).then(res => {
            console.log(res.data)
            if (res.data) {
                if (res.data.length === 1) {
                    setLatestMessage(res.data)
                } else {
                    setLatestMessage(res.data[0])
                }
            } else {
                alert('Error getting messages')
            }
        })
            .catch(err => console.log('error ', err))
    }

    const getLatestEmail = () => {
        setEmail(latestMessage.payload.headers.filter((item) => item.name === "To")?.shift()?.value)
        setDate(new Date(latestMessage?.internalDate).toLocaleString().split(', ')[1]) 
        setCode(latestMessage?.snippet?.match(/\d{6,6}/g)?.shift() ?? 'No Code Found')
    }

    useEffect(() => {
        if (latestMessage) {
            getLatestEmail()
        }
    }, [latestMessage])

    return (
        <AuthStateProvider value={{ authCreds, setAuthCreds, latestMessage, setLatestMessage, isLoggedIn, setIsLoggedIn, email, setEmail, getAuthCode, date, code }}>
            {props.children}
        </AuthStateProvider>
    )
}

export default AuthState;