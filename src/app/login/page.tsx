"use client";

import React, { useState } from 'react';
import { useSession, signIn } from "next-auth/react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Visibility, VisibilityOff, Pets } from '@mui/icons-material';
import Image from 'next/image';

function LoginPage() {
  const { data: session } = useSession();
  const [values, setValues] = useState({ email: '', password: '', showPassword: false });
  const [open, setOpen] = useState(false);

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Classic authentication logic (optional)
  };

  const handleGoogleSignIn = () => {
    if (session) {
      setOpen(true); // Show modal if the user is already logged in
    } else {
      signIn('google', { callbackUrl: localStorage.getItem("lastPage") || "/" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background:
          "linear-gradient(135deg, #D4F1F4, #E7F9F0, #C8E6C9, #E8F5E9)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "@keyframes gradientShift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                backgroundColor: "primary.main",
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Pets sx={{ fontSize: 40, color: "white" }} />
            </Box>

            <Typography
              component="h1"
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Welcome Back!
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Sign in to find or offer pet care services
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange("email")}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={values.showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  mb: 2,
                  color: "primary.main",
                  borderColor: "primary.main",
                  fontWeight: "medium",
                  padding: "10px 0",
                  transition:
                    "background-color 0.2s, transform 0.1s, border-color 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 200, 83, 0.1)",
                    borderColor: "#00b248",
                  },
                  "&:active": {
                    backgroundColor: "rgba(0, 200, 83, 0.2)",
                    borderColor: "#00a347",
                  },
                }}
              >
                Sign In
              </Button>

              <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                Or
              </Typography>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleSignIn}
                startIcon={
                  <Image
                    src="/images/google-logo.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                  />
                }
                sx={{
                  textTransform: "none",
                  borderWidth: "2px",
                  borderImage:
                    "linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58) 1",
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: "rgba(66, 133, 244, 0.1)",
                    borderImage:
                      "linear-gradient(90deg, #4285F4, #DB4437, #F4B400, #0F9D58) 1",
                  },
                }}
              >
                Sign in with Google
              </Button>

              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Link href="#" variant="body2" sx={{ display: "block", mb: 1 }}>
                  Forgot password?
                </Link>
                <Typography variant="body2">
                  Don’t have an account?{" "}
                  <Link href="/signup" variant="body2">
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            padding: 2,
            borderRadius: "12px",
            boxShadow: "0px 4px 15px rgba(0, 128, 64, 0.2)",
            backgroundColor: "#E8F5E9", // Light green background for a soft feel
            minWidth: "300px",
            maxWidth: "400px",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textAlign: "center",
            borderBottom: "1px solid rgba(0, 200, 83, 0.2)", // Subtle separator
            paddingBottom: 1,
          }}
        >
          Already Logged In
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            color: "text.secondary",
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <Typography variant="body1" sx={{ paddingTop: 1 }}>
            You are already logged in. No need to sign in again!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              fontWeight: "medium",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;