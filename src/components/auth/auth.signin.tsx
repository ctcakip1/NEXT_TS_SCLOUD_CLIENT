"use client"
import { Avatar, Box, Button, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import LockIcon from '@mui/icons-material/Lock';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { useState } from 'react';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from 'next-auth/react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const AuthSignIn = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");
        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("Username is not empty")
            return;
        }
        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password is not empty")
            return;
        }
        const res = await signIn('credentials',
            {
                redirect: false,
                username: username,
                password: password
            }
        )
        if (!res?.error) {
            router.push("/")
        } else {
            setOpen(true);
            setResMessage(res.error);
        }
    }

    return (
        <Box
            sx={{
                backgroundImage: "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
                backgroundColor: "#b7e6d9",
                backgroundRepeat: "no-repeat"
            }}
        >
            <Grid container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}>
                <Grid item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}
                    sx={
                        { boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }
                    }
                >
                    <div style={{ margin: "20px" }}>
                        <Link href={"/"}>
                            <ArrowBackIcon />
                        </Link>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center",
                                width: "100%",
                            }}>
                            <Avatar>
                                <LockIcon />
                            </Avatar>
                            <Typography component="h1">
                                Sign in
                            </Typography>
                        </Box>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            label="Username"
                            name='username'
                            autoFocus
                            variant="outlined"
                            onChange={
                                (e) => setUsername(e.target.value)
                            }
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            label="Password"
                            name='password'
                            variant="outlined"
                            error={isErrorPassword}
                            helperText={errorPassword}
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position='end'>
                                    <IconButton onClick={
                                        () => setShowPassword(!showPassword)
                                    }>
                                        {showPassword === false ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit()
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                my: 3
                            }}
                            type='submit'
                            fullWidth
                            color='primary'
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Divider>Or using</Divider>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "25px",
                                justifyContent: "center",
                                mt: 3
                            }}>
                            <Avatar sx={{
                                cursor: "pointer",
                                bgcolor: "orange"
                            }}>
                                <GitHubIcon
                                    titleAccess='Login with Github'
                                    onClick={() => signIn('github')}
                                />
                            </Avatar>

                            <Avatar sx={{
                                cursor: "pointer",
                                bgcolor: "orange"
                            }}>
                                <GoogleIcon titleAccess='Login with Google' />
                            </Avatar>
                        </Box>

                    </div>
                </Grid>
            </Grid>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                    onClose={() => setOpen(false)}
                >
                    {resMessage}
                </Alert>
            </Snackbar>
        </Box>

    )
}
export default AuthSignIn;