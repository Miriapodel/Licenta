"use client";
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stack } from '@mui/material';
import { Pets } from '@mui/icons-material';

function SignupPage() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues); // Handle form submission
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
        maxWidth="sm"
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
              borderRadius: "12px",
              boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#FFFFFFCC",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#009688",
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
              sx={{ fontWeight: "bold", color: "#333333" }}
            >
              Create Your Account
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3, color: "#666666" }}
            >
              Join us to find or offer pet care services.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%", mt: 2 }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: "#555555" }}>
                Personal Information
              </Typography>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  value={formValues.firstName}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#009688",
                      },
                      "&:hover fieldset": {
                        borderColor: "#00796B",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#004D40",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={formValues.lastName}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#009688",
                      },
                      "&:hover fieldset": {
                        borderColor: "#00796B",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#004D40",
                      },
                    },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  variant="outlined"
                  value={formValues.email}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#009688",
                      },
                      "&:hover fieldset": {
                        borderColor: "#00796B",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#004D40",
                      },
                    },
                  }}
                />
              </Stack>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 4,
                  fontWeight: "bold",
                  padding: "12px 0",
                  color: "#009688",
                  borderColor: "#009688",
                  transition: "background-color 0.3s ease, transform 0.1s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 153, 136, 0.1)",
                    borderColor: "#00796B",
                  },
                  "&:active": {
                    backgroundColor: "rgba(0, 153, 136, 0.2)",
                    borderColor: "#004D40",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;
