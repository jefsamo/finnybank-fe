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
} from "@mantine/core";
import { useForm } from "@mantine/form";

type CreateUserFormValues = {
  name: string;
  email: string;
  role: string | null;
  department: string;
  temporaryPassword: string;
};

const roleOptions = [
  "Administrator",
  "Supervisor",
  "Agent",
  "Auditor",
  "Read Only",
];

const CreateUser = () => {
  const form = useForm<CreateUserFormValues>({
    initialValues: {
      name: "",
      email: "admin@finnybank.com",
      role: null,
      department: "",
      temporaryPassword: "P@ssw0rd!",
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? "Name is required" : null),
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      role: (value) => (!value ? "Role is required" : null),
      temporaryPassword: (value) =>
        value.length < 8 ? "Password must be at least 8 characters" : null,
    },
  });

  const handleSubmit = (values: CreateUserFormValues) => {
    // plug into your API call here
    console.log("Create user payload:", values);
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
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Name"
                placeholder="Enter full name"
                {...form.getInputProps("name")}
              />

              <TextInput
                label="Email"
                placeholder="admin@finnybank.com"
                {...form.getInputProps("email")}
              />

              <Select
                label="Role"
                placeholder="-- Select Role --"
                data={roleOptions}
                {...form.getInputProps("role")}
              />

              <TextInput
                label="Department (optional)"
                placeholder="Enter department"
                {...form.getInputProps("department")}
              />

              <PasswordInput
                label="Temporary Password"
                {...form.getInputProps("temporaryPassword")}
                description="Password must be at least 8 characters with at least a number and a symbol."
              />

              <Button type="submit" mt="sm" color="orange">
                Create User
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* You can plug an Existing Users table here later */}
        <Title order={3} fw={500}>
          Existing Users
        </Title>
      </Container>
    </div>
  );
};

export default CreateUser;
