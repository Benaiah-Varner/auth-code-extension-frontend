import { useState, useContext } from 'react'
import { AuthStateContext } from '../utils/AuthState';
import { Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReplayIcon from '@mui/icons-material/Replay';
import { Tooltip } from '@mui/material';

const useStyles = makeStyles(theme => ({
    authBox: {
        background: 'white',
        fontSize: '1.5rem',
        color: 'black',
        display: 'flex',
        justifyContent: 'spave-evenly',
        width: '150px',
        alignItems: 'center',
        flexDirection: 'column',
    },
    textBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        cursor: 'pointer',
        width: '150px',
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    retryIcon: {
        '&:hover': {
            color: '#7dafff'
        },
        marginTop: '10px', display: 'flex', alignItems: 'center', color: '#478eff', cursor: 'pointer', fontSize: '.95rem'
    }
}));

const AuthBox = () => {
    const { email, getAuthCode, date, code } = useContext(AuthStateContext);
    const [copied, setCopied] = useState(false);
    const classes = useStyles();

    return (
        <Box component='main' padding={2} display='flex' justifyContent='space-evenly' flexDirection='column' justify='center' alignItems='center' flex="1">
            <Grid item width="200px" className={classes.gridItem}>
                <Typography> Email Address: </Typography>
                <Box className={classes.authBox}>
                    <Typography style={{ fontSize: '1rem', background: 'white', }}>{email}</Typography>
                </Box>
            </Grid>
            <Grid item className={classes.gridItem}>
                <Typography> Your Auth Code: </Typography>
                <Box className={classes.authBox}>
                    <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                        <Typography className={classes.textBox} style={{ fontSize: code === 'No Code Found' ? '.95rem' : 'inherit' }}>
                            {code}
                            {
                                code !== 'No Code Found' &&
                                <Tooltip title={copied ? 'Copied!' : 'Copy'} arrow>
                                    <ContentCopyIcon fontSize="inherit" style={{ cursor: 'pointer', fontSize: '18px' }} />
                                </Tooltip>
                            }
                        </Typography>
                    </CopyToClipboard>
                </Box>
                <Typography style={{ marginTop: '10px' }}>From: {date}</Typography>
                <Typography className={classes.retryIcon} onClick={getAuthCode}> <ReplayIcon fontSize="inherit" /> Retry</Typography>
            </Grid>
        </Box>
    )
}

export default AuthBox
