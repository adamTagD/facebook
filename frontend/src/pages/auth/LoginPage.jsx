import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/authLayout";
import "./authstyles.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Email validation regex
  const emailRegex = /.+@.+\..+/;

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear global messages
    if (error) setError("");
    if (success) setSuccess("");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        // Handle successful login
        console.log("Login success:", data);

        // Store token if using JWT
        // localStorage.setItem('token', data.token);

        // Redirect to dashboard or home page
        setTimeout(() => {
          // navigate('/dashboard');
          console.log("Redirecting to dashboard...");
        }, 1500);
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Box
          sx={{
            mx: "auto",
            mb: 2,
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoginIcon sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          أهلا مجددا
        </Typography>
        <Typography variant="body2" color="text.secondary">
          سجل الدخول لاستخدام الموقع
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Login Form */}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="الإيميل"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          sx={{ mb: 2 }}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="كلمة السر"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            أو
          </Typography>
        </Divider>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            ليس لديك حساب؟
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/signup")}
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              إنشاء حساب
            </Link>
          </Typography>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
