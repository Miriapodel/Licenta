"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Stack } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { useGoogleMaps } from '../contexts/PlacesContext.tsx'; // Import contextul GoogleMaps

function SignupPage() {
  const { googleLoaded } = useGoogleMaps(); // Accesează starea googleLoaded din context
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    fullAddress: '',
  });
  const addressInputRef = useRef(null);

  useEffect(() => {
    if (googleLoaded && typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const formattedAddress = place.formatted_address;
        setFormValues((prevValues) => ({
          ...prevValues,
          fullAddress: formattedAddress,
        }));
      });
    }
  }, [googleLoaded]);

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
              Create Your Account
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Join us to find or offer pet care services.
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ width: "100%" }}
            >
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </Stack>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                sx={{ mt: 2 }}
              />
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Address Information
              </Typography>
              <TextField
                fullWidth
                label="Address"
                placeholder="Start typing your address..."
                name="fullAddress"
                inputRef={addressInputRef}
                value={formValues.fullAddress}
                onChange={handleChange}
              />
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{
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
                  Sign Up
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default SignupPage;