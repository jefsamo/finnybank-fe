import {
  Container,
  Title,
  Table,
  Textarea,
  Button,
  Group,
  Stack,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";

interface IncidentDetails {
  createdAt: string;
  customer: string;
  mobile: string;
  source: string;
  caseType: string;
  product: string;
  severity: string;
  status: string;
  assigned: string;
  slaDue: string;
  cardFirst4: string;
  cardLast4: string;
  comment: string;
}

interface AuditRecord {
  timestamp: string;
  user: string;
  action: string;
  description: string;
}

const details: IncidentDetails = {
  createdAt: "2025-11-17 16:20",
  customer: "JOSEPHINE",
  mobile: "0244212081",
  source: "InBranch",
  caseType: "Complaint",
  product: "Electronic Cards",
  severity: "High",
  status: "Escalated",
  assigned: "ATM Channel Unit",
  slaDue: "2025-11-18 16:20",
  cardFirst4: "5684",
  cardLast4: "3224",
  comment: "DAILY LIMIT EXCEEDED",
};

const auditHistory: AuditRecord[] = [
  {
    timestamp: "2025-11-19 12:58",
    user: "Samuel Asante Jnr",
    action: "ESCALATE",
    description: "Incident 3 escalated due to SLA breach",
  },
  {
    timestamp: "2025-11-19 12:58",
    user: "Samuel Asante Jnr",
    action: "RISK_ALERT",
    description: "Risk alert generated for incident 3",
  },
];

const IncidentDetail = () => {
  const [notes, setNotes] = useState("");

  const rows = Object.entries(details).map(([key, value]) => (
    <Table.Tr key={key}>
      <Table.Td
        style={{
          backgroundColor: "#f6a623",
          fontWeight: 600,
          width: 200,
        }}
      >
        {key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())
          .replace("At", " At")
          .replace("sla Due", "SLA Due")
          .replace("card First4", "Card First 4:")
          .replace("card Last4", "Card Last 4:")}
      </Table.Td>
      <Table.Td>{value}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Incident 20251117162014924244
        </Title>

        {/* Details Table */}
        <Paper withBorder shadow="sm" radius="md" mb="xl">
          <ScrollArea>
            <Table verticalSpacing="md" highlightOnHover>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>

        {/* Update Incident */}
        <Title order={3} mb="sm">
          Update Incident
        </Title>

        <Paper withBorder shadow="sm" radius="md" p="md" mb="xl">
          <Stack>
            <Textarea
              label="Resolution Details / Notes"
              minRows={6}
              value={notes}
              onChange={(e) => setNotes(e.currentTarget.value)}
            />

            <Group>
              <Button color="orange">Save</Button>
              <Button color="orange" variant="filled">
                Send & Close
              </Button>
              <Button color="orange" variant="filled">
                Save & Close
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Audit History */}
        <Title order={3} mb="sm">
          Audit History
        </Title>

        <Paper withBorder shadow="sm" radius="md">
          <ScrollArea>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: "#f6a623" }}>
                  <Table.Th>Timestamp</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {auditHistory.map((row, idx) => (
                  <Table.Tr
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#fff7ee" : "white",
                    }}
                  >
                    <Table.Td>{row.timestamp}</Table.Td>
                    <Table.Td>{row.user}</Table.Td>
                    <Table.Td>{row.action}</Table.Td>
                    <Table.Td>{row.description}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
      </Container>
    </div>
  );
};

export default IncidentDetail;
