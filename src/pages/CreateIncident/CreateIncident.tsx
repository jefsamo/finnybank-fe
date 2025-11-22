/* eslint-disable @typescript-eslint/no-explicit-any */
// CreateIncident.tsx
import {
  Container,
  Title,
  TextInput,
  Select,
  Textarea,
  Group,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createIncident } from "../../services/project.services";
import { useState } from "react";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";

// const productOptions = [
//   "Electronic Cards",
//   "Loans",
//   "Electronic Banking",
//   "Investment",
//   "Account Operations",
//   "Others",
// ];

// const sourceOptions = [
//   "InBranch",
//   "Call Center",
//   "Online",
//   "ATM",
//   "Mobile Banking",
//   "Others",
// ];

// const caseTypeOptions = ["Complaint", "Enquiry", "Request", "Feedback"];
// const severityOptions = ["Low", "Medium", "High", "Critical"];

// type CreateIncidentFormValues = {
//   customerName: string;
//   phoneNumber: string;
//   product: string | null;
//   source: string | null;
//   caseType: string | null;
//   urgency: string | null;
//   cardFirst4: string;
//   cardLast4: string;
//   comment: string;
// };

const CreateIncident = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      customerName: "",
      phoneNumber: "",
      productService: "",
      source: "",
      caseType: "",
      urgency: "",
      firstFourCardDigits: "",
      lastFourCardDigits: "",
      comment: "",
      status: "Open",
    },
  });

  const handleSubmit = async (values: any) => {
    setSuccess(null);
    setError(null);
    setLoading(true);

    try {
      const response = await createIncident(values);
      setSuccess("Incident created successfully!");
      form.reset();
      console.log("New Incident:", response);
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "50px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Create Incident
        </Title>

        <Paper withBorder radius="md" shadow="sm" p="lg">
          {success && (
            <Alert icon={<IconCheck size={16} />} color="green" mb="md">
              {success}
            </Alert>
          )}

          {error && (
            <Alert icon={<IconAlertTriangle size={16} />} color="red" mb="md">
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Customer Name"
                {...form.getInputProps("customerName")}
              />

              <TextInput
                label="Mobile Number"
                {...form.getInputProps("phoneNumber")}
              />

              <Select
                label="Product/Service"
                placeholder="-- Select Product/Service --"
                data={[
                  "Electronic Cards",
                  "Loans",
                  "Electronic Banking",
                  "Investment",
                  "Account Operations",
                  "Others",
                ]}
                {...form.getInputProps("productService")}
              />

              <Select
                label="Source"
                placeholder="-- Select Source --"
                data={[
                  "InBranch",
                  "Call Center",
                  "Online",
                  "ATM",
                  "Mobile Banking",
                  "Others",
                ]}
                {...form.getInputProps("source")}
              />

              <Select
                label="Case Type"
                placeholder="-- Select Case Type --"
                data={["Complaint", "Enquiry", "Request", "Feedback"]}
                {...form.getInputProps("caseType")}
              />
              <Select
                label="Status"
                placeholder="-- Select Status --"
                data={["Open", "Resolved", "Escalated"]}
                {...form.getInputProps("status")}
              />

              <Select
                label="Urgency"
                placeholder="-- Select Urgency/Severity --"
                data={["Low", "Medium", "High", "Critical"]}
                {...form.getInputProps("urgency")}
              />

              <TextInput
                label="Card First 4 Digits"
                maxLength={4}
                {...form.getInputProps("firstFourCardDigits")}
              />

              <TextInput
                label="Card Last 4 Digits"
                maxLength={4}
                {...form.getInputProps("lastFourCardDigits")}
              />

              <Textarea
                label="Comment / Description"
                minRows={4}
                {...form.getInputProps("comment")}
              />

              <Group>
                <Button type="submit" color="orange" loading={loading}>
                  Submit
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default CreateIncident;
