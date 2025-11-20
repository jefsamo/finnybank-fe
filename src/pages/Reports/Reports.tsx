/* eslint-disable @typescript-eslint/no-unused-vars */
// ReportsPage.tsx
import {
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";

type SummaryRow = { label: string; count: number };

const bySeverity: SummaryRow[] = [
  { label: "Low", count: 1 },
  { label: "Medium", count: 0 },
  { label: "High", count: 2 },
];

const byType: SummaryRow[] = [
  { label: "Complaint", count: 2 },
  { label: "Enquiry", count: 1 },
];

const byDepartment: SummaryRow[] = [
  { label: "ATM Channel Unit", count: 2 },
  { label: "Account Operations", count: 1 },
];

const slaCompliance: SummaryRow[] = [
  { label: "Compliant", count: 2 },
  { label: "Breached", count: 0 },
];

function SummaryTable({
  title,
  headerLabel,
  rows,
}: {
  title: string;
  headerLabel: string;
  rows: SummaryRow[];
}) {
  return (
    <Stack gap={4} mt="lg">
      <Text fw={600}>{title}</Text>
      <Paper withBorder radius="md" shadow="xs">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: "#f6a623" }}>
              <Table.Th>{headerLabel}</Table.Th>
              <Table.Th>Count</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((row, index) => (
              <Table.Tr
                key={row.label}
                style={{
                  backgroundColor: index % 2 === 1 ? "#fff7ee" : "white",
                }}
              >
                <Table.Td>{row.label}</Table.Td>
                <Table.Td>{row.count}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

function formatDate(d: Date | null) {
  if (!d) return "";
  // yyyy-mm-dd
  return d.toISOString().slice(0, 10);
}

const Reports = () => {
  const [from] = useState<Date | null>(new Date("2025-10-20"));
  const [to] = useState<Date | null>(new Date("2025-11-18"));

  const handleFilter = () => {
    // plug into your API / query here
    console.log("Filter from", from, "to", to);
  };

  const summaryRangeText =
    from && to
      ? `Incidents Summary (${formatDate(from)} to ${formatDate(to)})`
      : "Incidents Summary";

  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Reports
        </Title>

        {/* Filter row */}
        <Group align="flex-end" gap="sm" wrap="wrap" mb="lg">
          <Stack gap={4}>
            <Text fz="sm" fw={500}>
              From:
            </Text>
            <DateInput
              value={from}
              //   onChange={setFrom}
              valueFormat="MM/DD/YYYY"
              placeholder="Select date"
            />
          </Stack>

          <Stack gap={4}>
            <Text fz="sm" fw={500}>
              To:
            </Text>
            <DateInput
              value={to}
              //   onChange={setTo}
              valueFormat="MM/DD/YYYY"
              placeholder="Select date"
            />
          </Stack>

          <Button mt="md" color="orange" onClick={handleFilter}>
            Filter
          </Button>
        </Group>

        <Text fw={600} mb="sm">
          {summaryRangeText}
        </Text>

        {/* Sections */}
        <SummaryTable
          title="By Severity"
          headerLabel="Severity"
          rows={bySeverity}
        />

        <SummaryTable title="By Type" headerLabel="Type" rows={byType} />

        <SummaryTable
          title="By Department"
          headerLabel="Department"
          rows={byDepartment}
        />

        <SummaryTable
          title="SLA Compliance"
          headerLabel="Category"
          rows={slaCompliance}
        />

        {/* Average resolution + export */}
        <Stack mt="lg" gap="xs">
          <Text fw={600}>Average Resolution Time</Text>
          <Text>0.00 hours</Text>

          <Button
            mt="sm"
            color="orange"
            onClick={() => {
              // hook up your CSV export here
              console.log("Export CSV clicked");
            }}
          >
            Export CSV
          </Button>
        </Stack>
      </Container>
    </div>
  );
};

export default Reports;
