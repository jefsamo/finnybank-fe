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
} from "@mantine/core";
import { useForm } from "@mantine/form";

const productOptions = [
  "Electronic Cards",
  "Loans",
  "Electronic Banking",
  "Investment",
  "Account Operations",
  "Others",
];

const sourceOptions = [
  "InBranch",
  "Call Center",
  "Online",
  "ATM",
  "Mobile Banking",
  "Others",
];

const caseTypeOptions = ["Complaint", "Enquiry", "Request", "Feedback"];
const severityOptions = ["Low", "Medium", "High", "Critical"];

type CreateIncidentFormValues = {
  customerName: string;
  mobileNumber: string;
  product: string | null;
  source: string | null;
  caseType: string | null;
  severity: string | null;
  cardFirst4: string;
  cardLast4: string;
  comment: string;
};

const CreateIncident = () => {
  const form = useForm<CreateIncidentFormValues>({
    initialValues: {
      customerName: "",
      mobileNumber: "",
      product: null,
      source: null,
      caseType: null,
      severity: null,
      cardFirst4: "",
      cardLast4: "",
      comment: "",
    },
    // validate: {
    //   customerName: (value: {
    //     trim: () => { (): any; new (): any; length: number };
    //   }) => (value.trim().length === 0 ? "Customer name is required" : null),
    //   mobileNumber: (value: {
    //     trim: () => { (): any; new (): any; length: number };
    //   }) => (value.trim().length === 0 ? "Mobile number is required" : null),
    //   product: (value: any) =>
    //     !value ? "Product / Service is required" : null,
    //   source: (value: any) => (!value ? "Source is required" : null),
    // },
  });

  const handleSubmit = (values: CreateIncidentFormValues) => {
    // Replace with your API call
    console.log("Create incident payload:", values);
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Create Incident
        </Title>

        <Paper withBorder radius="md" shadow="sm" p="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Customer Name *"
                placeholder="Enter customer name"
                {...form.getInputProps("customerName")}
              />

              <TextInput
                label="Mobile Number *"
                placeholder="Enter mobile number"
                {...form.getInputProps("mobileNumber")}
              />

              <Select
                label="Product/Service *"
                placeholder="-- Select Product/Service --"
                data={productOptions}
                searchable
                nothingFoundMessage="No options"
                {...form.getInputProps("product")}
              />

              <Select
                label="Source *"
                placeholder="-- Select Source --"
                data={sourceOptions}
                searchable
                nothingFoundMessage="No options"
                {...form.getInputProps("source")}
              />

              <Select
                label="Case Type"
                placeholder="-- Select Case Type --"
                data={caseTypeOptions}
                {...form.getInputProps("caseType")}
              />

              <Select
                label="Severity"
                placeholder="-- Select Severity --"
                data={severityOptions}
                {...form.getInputProps("severity")}
              />

              <TextInput
                label="Card First 4 Digits (for card issues)"
                placeholder="1234"
                maxLength={4}
                {...form.getInputProps("cardFirst4")}
              />

              <TextInput
                label="Card Last 4 Digits (for card issues)"
                placeholder="5678"
                maxLength={4}
                {...form.getInputProps("cardLast4")}
              />

              <Textarea
                label="Comment / Description"
                minRows={4}
                placeholder="Describe the incident..."
                {...form.getInputProps("comment")}
              />

              <Group mt="md">
                <Button type="submit" color="orange">
                  Save
                </Button>
                <Button type="submit" color="orange" variant="filled">
                  Save & Create Another
                </Button>
                <Button type="button" variant="default">
                  Cancel
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
