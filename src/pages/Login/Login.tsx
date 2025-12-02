/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Container,
  Box,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Enter a valid email",
      password: (value) =>
        value.trim().length === 0 ? "Password is required" : null,
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      // Adjust this to match your backend URL & payload
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        }
      );
      console.log(res);

      if (!res.ok) {
        // Optionally read error message from backend
        const data = await res.json().catch(() => null);
        const message = data?.message || data?.error || "Invalid credentials";
        throw new Error(message);
      }

      const data = await res.json();

      // Example: backend returns { token: string, user: {...} }
      const token: string | undefined = data.accessToken;

      if (!token) {
        throw new Error("Login response is missing token");
      }

      // Store token (and optionally user info)
      localStorage.setItem("authToken", token);
      if (data.user) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      }

      // Navigate to dashboard/home
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container size={420}>
        <Stack align="center" mb="lg">
          {/* Logo block */}
          <Box
            w={60}
            h={60}
            bg="white"
            style={{
              borderRadius: 4,
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text fw={700} fz="xs" c="black" ta="center">
              FINNY
              <br />
              BANK
            </Text>
          </Box>

          <Title order={2} ta="center">
            Finny Bank Incident System
          </Title>
          <Text c="dimmed" fz="sm">
            Please sign in to continue.
          </Text>
        </Stack>

        <Paper withBorder shadow="sm" radius="md" p="lg">
          {error && (
            <Alert
              mb="md"
              icon={<IconAlertCircle size={16} />}
              color="red"
              variant="light"
            >
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="admin@finnybank.com"
                autoComplete="username"
                {...form.getInputProps("email")}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...form.getInputProps("password")}
              />

              <Button type="submit" color="orange" fullWidth loading={loading}>
                Login
              </Button>

              {/* Optional: Forgot password / help link */}
              <Text fz="xs" ta="center" c="dimmed">
                Having trouble logging in?{" "}
                <Anchor component="button" size="xs">
                  Contact support
                </Anchor>
              </Text>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
