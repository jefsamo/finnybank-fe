/* eslint-disable @typescript-eslint/no-explicit-any */
// UserManagementPage.tsx
import {
  Button,
  Container,
  PasswordInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
  Alert,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import {
  createUser,
  fetchDepartments,
  type Department,
} from "../../services/project.services";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "supervisor", label: "Supervisor" },
  { value: "csa", label: "Customer Service Agent" },
  { value: "auditor", label: "Auditor" },
];

type CreateUserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[]; // array, matches backend
  departmentId: string;
  password: string;
};

const CreateUser = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CreateUserFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      roles: [],
      departmentId: "",
      password: "",
    },
    validate: {
      firstName: (v) => (!v.trim() ? "First name is required" : null),
      lastName: (v) => (!v.trim() ? "Last name is required" : null),
      email: (v) =>
        /^\S+@\S+\.\S+$/.test(v) ? null : "Valid email is required",
      roles: (v) => (v.length === 0 ? "Select at least one role" : null),
      password: (v) =>
        v.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });

  useEffect(() => {
    fetchDepartments()
      .then(setDepartments)
      .catch((err) => {
        console.error(err);
        setError("Failed to load departments");
      });
  }, []);

  const handleSubmit = async (values: CreateUserFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createUser({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        roles: values.roles, // already an array of codes
        password: values.password,
        departmentId: values.departmentId || undefined,
      });
      setSuccess("User created successfully");
      form.reset();
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to create user";
      setError(Array.isArray(msg) ? msg.join(", ") : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="md">
          User Management
        </Title>

        <Title order={3} mb="md" fw={500}>
          Create New User
        </Title>

        <Paper withBorder radius="md" shadow="sm" p="lg" mb="xl">
          {success && (
            <Alert
              mb="md"
              color="green"
              icon={<IconCheck size={16} />}
              variant="light"
              withCloseButton
              onClose={() => setSuccess(null)}
            >
              {success}
            </Alert>
          )}

          {error && (
            <Alert
              mb="md"
              color="red"
              icon={<IconAlertTriangle size={16} />}
              variant="light"
              withCloseButton
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="First Name"
                placeholder="Enter first name"
                {...form.getInputProps("firstName")}
              />

              <TextInput
                label="Last Name"
                placeholder="Enter last name"
                {...form.getInputProps("lastName")}
              />

              <TextInput
                label="Email"
                placeholder="admin@finnybank.com"
                {...form.getInputProps("email")}
              />

              <MultiSelect
                label="Roles"
                placeholder="-- Select Role(s) --"
                data={roleOptions}
                {...form.getInputProps("roles")}
              />

              <Select
                label="Department"
                placeholder="Select department"
                data={departments.map((d) => ({
                  value: d._id,
                  label: d.name,
                }))}
                {...form.getInputProps("departmentId")}
              />

              <PasswordInput
                label="Temporary Password"
                {...form.getInputProps("password")}
                description="Password must be at least 8 characters with at least a number and a symbol."
              />

              <Button
                type="submit"
                mt="sm"
                style={{ backgroundColor: "#f6a623" }}
                loading={loading}
              >
                Create User
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default CreateUser;
