/* eslint-disable @typescript-eslint/no-explicit-any */
// Incidents.tsx
import { useEffect, useState, type FC } from "react";
import {
  Container,
  Title,
  Table,
  Anchor,
  ScrollArea,
  Box,
  Center,
  Loader,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { fetchIncidents, type Incident } from "../../services/project.services";

// interface Incident {
//   reference: string;
//   date: string;
//   customer: string;
//   caseType: string;
//   product: string;
//   severity: string;
//   status: string;
//   assigned: string;
// }

// const INCIDENTS: Incident[] = [
//   {
//     reference: "20251117162014924244",
//     date: "2025-11-17 16:20",
//     customer: "JOSEPHINE",
//     caseType: "Complaint",
//     product: "Electronic Cards",
//     severity: "High",
//     status: "Escalated",
//     assigned: "ATM Channel Unit",
//   },
//   {
//     reference: "20251117161808743048",
//     date: "2025-11-17 16:18",
//     customer: "Samuel",
//     caseType: "Enquiry",
//     product: "Others",
//     severity: "Low",
//     status: "Resolved",
//     assigned: "Account Operations",
//   },
//   {
//     reference: "20251116190655777085",
//     date: "2025-11-16 19:06",
//     customer: "Samuel",
//     caseType: "Complaint",
//     product: "Electronic Cards",
//     severity: "High",
//     status: "Resolved",
//     assigned: "ATM Channel Unit",
//   },
// ];

const Incidents: FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIncidents();
        setIncidents(data);
      } catch (err: any) {
        console.error(err);
        setError(err?.response?.data?.message || "Failed to load incidents.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div style={{ margin: "50px 0" }}>
        <Container size="lg" py="xl">
          <Center>
            <Loader />
          </Center>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Text c="red" mb="md">
          {error}
        </Text>
      </Container>
    );
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="md">
          Incidents
        </Title>

        {/* Scroll horizontally on small screens */}
        <ScrollArea offsetScrollbars>
          <Box
            style={{
              border: "1px solid #ddd",
              borderRadius: 4,
              overflow: "hidden",
              minWidth: 700, // keeps table layout tidy on narrow screens
            }}
          >
            <Table
              highlightOnHover
              verticalSpacing="xs"
              horizontalSpacing="md"
              withRowBorders={false}
            >
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: "#f6a623" }}>
                  <Table.Th>Reference</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Customer</Table.Th>
                  <Table.Th>Case Type</Table.Th>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Severity</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Department</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {incidents.map((incident, index) => (
                  <Table.Tr
                    key={incident.referenceId}
                    style={{
                      backgroundColor: index % 2 === 1 ? "#fff7ee" : "#ffffff",
                    }}
                  >
                    <Table.Td>{incident.referenceId ?? "1111"}</Table.Td>
                    <Table.Td>{incident.createdAt}</Table.Td>
                    <Table.Td>{incident.customerName}</Table.Td>
                    <Table.Td>{incident.caseType}</Table.Td>
                    <Table.Td>{incident.productService}</Table.Td>
                    <Table.Td>{incident.urgency}</Table.Td>
                    <Table.Td>{incident.status ?? "open"}</Table.Td>
                    <Table.Td>{incident.productService}</Table.Td>
                    <Table.Td>
                      <Anchor
                        component="button"
                        size="sm"
                        onClick={() => navigate(`/incidents/${incident._id}`)}
                      >
                        View
                      </Anchor>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Box>
        </ScrollArea>
      </Container>
    </div>
  );
};

export default Incidents;
