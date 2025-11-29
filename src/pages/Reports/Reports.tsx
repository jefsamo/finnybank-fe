/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// ReportsPage.tsx
import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import {
  fetchIncidentReport,
  type IncidentReportSummary,
  type SummaryRow,
} from "../../services/project.services";
import { IconAlertTriangle } from "@tabler/icons-react";
import { exportToCsv } from "../../services/exportCsv";

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
            {rows.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={2}>
                  <Text ta="center" c="dimmed">
                    No data
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
}

function formatDateParam(value: Date | string | null) {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

const Reports = () => {
  const [from, setFrom] = useState<Date | string | null>(null);
  const [to, setTo] = useState<Date | string | null>(null);
  const [summary, setSummary] = useState<IncidentReportSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReport = async (
    fromDate?: Date | string | null,
    toDate?: Date | string | null
  ) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchIncidentReport(
        formatDateParam(fromDate ?? from),
        formatDateParam(toDate ?? to)
      );
      setSummary(data);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to load report";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // initial load (e.g. last 30 days, or all if you prefer)
  useEffect(() => {
    loadReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = () => {
    loadReport(from, to);
  };

  if (loading && !summary) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Reports
        </Title>

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

        {/* Filter row */}
        <Group align="flex-end" gap="sm" wrap="wrap" mb="lg">
          <Stack gap={4}>
            <Text fz="sm" fw={500}>
              From:
            </Text>
            <DateInput
              value={from}
              onChange={setFrom}
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
              onChange={setTo}
              valueFormat="MM/DD/YYYY"
              placeholder="Select date"
            />
          </Stack>

          <Button
            mt="md"
            style={{ backgroundColor: "#f6a623" }}
            onClick={handleFilter}
            loading={loading}
          >
            Filter
          </Button>
        </Group>

        {summary && (
          <>
            <Text fw={600} mb="sm">
              Incidents Summary{" "}
              {summary.from && summary.to
                ? `(${new Date(summary.from).toLocaleDateString()} - ${new Date(
                    summary.to
                  ).toLocaleDateString()})`
                : ""}
            </Text>

            <SummaryTable
              title="By Severity"
              headerLabel="Severity"
              rows={summary.bySeverity}
            />

            <SummaryTable
              title="By Type"
              headerLabel="Type"
              rows={summary.byType}
            />

            <SummaryTable
              title="By Department"
              headerLabel="Department"
              rows={summary.byDepartment}
            />

            <SummaryTable
              title="SLA Compliance"
              headerLabel="Category"
              rows={summary.slaCompliance}
            />

            <Stack mt="lg" gap="xs">
              <Text fw={600}>Average Resolution Time</Text>
              <Text>{summary.avgResolutionHours.toFixed(2)} hours</Text>

              <Button
                mt="sm"
                style={{ backgroundColor: "#f6a623" }}
                onClick={() => {
                  if (!summary) return;

                  const rows: {
                    category: string;
                    label: string;
                    count: number | string;
                  }[] = [];

                  summary.bySeverity.forEach((row) =>
                    rows.push({
                      category: "Severity",
                      label: row.label,
                      count: row.count,
                    })
                  );

                  summary.byType.forEach((row) =>
                    rows.push({
                      category: "Type",
                      label: row.label,
                      count: row.count,
                    })
                  );

                  summary.byDepartment.forEach((row) =>
                    rows.push({
                      category: "Department",
                      label: row.label,
                      count: row.count,
                    })
                  );

                  summary.slaCompliance.forEach((row) =>
                    rows.push({
                      category: "SLA Compliance",
                      label: row.label,
                      count: row.count,
                    })
                  );

                  // Add average resolution time as a final row
                  rows.push({
                    category: "Average Resolution Time",
                    label: "Hours",
                    count: summary.avgResolutionHours.toFixed(2),
                  });

                  exportToCsv("incident_report.csv", rows);
                }}
              >
                Export CSV
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </div>
  );
};

export default Reports;
