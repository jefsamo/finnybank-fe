// Incidents.tsx
import React, { type FC } from "react";
import {
  Container,
  Title,
  Table,
  Anchor,
  ScrollArea,
  Box,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface Incident {
  reference: string;
  date: string;
  customer: string;
  caseType: string;
  product: string;
  severity: string;
  status: string;
  assigned: string;
}

const INCIDENTS: Incident[] = [
  {
    reference: "20251117162014924244",
    date: "2025-11-17 16:20",
    customer: "JOSEPHINE",
    caseType: "Complaint",
    product: "Electronic Cards",
    severity: "High",
    status: "Escalated",
    assigned: "ATM Channel Unit",
  },
  {
    reference: "20251117161808743048",
    date: "2025-11-17 16:18",
    customer: "Samuel",
    caseType: "Enquiry",
    product: "Others",
    severity: "Low",
    status: "Resolved",
    assigned: "Account Operations",
  },
  {
    reference: "20251116190655777085",
    date: "2025-11-16 19:06",
    customer: "Samuel",
    caseType: "Complaint",
    product: "Electronic Cards",
    severity: "High",
    status: "Resolved",
    assigned: "ATM Channel Unit",
  },
];

const Incidents: FC = () => {
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
                  <Table.Th>Assigned</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {INCIDENTS.map((incident, index) => (
                  <Table.Tr
                    key={incident.reference}
                    style={{
                      backgroundColor: index % 2 === 1 ? "#fff7ee" : "#ffffff",
                    }}
                  >
                    <Table.Td>{incident.reference}</Table.Td>
                    <Table.Td>{incident.date}</Table.Td>
                    <Table.Td>{incident.customer}</Table.Td>
                    <Table.Td>{incident.caseType}</Table.Td>
                    <Table.Td>{incident.product}</Table.Td>
                    <Table.Td>{incident.severity}</Table.Td>
                    <Table.Td>{incident.status}</Table.Td>
                    <Table.Td>{incident.assigned}</Table.Td>
                    <Table.Td>
                      <Anchor component={Link} to="/incidents/1" size="sm">
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
