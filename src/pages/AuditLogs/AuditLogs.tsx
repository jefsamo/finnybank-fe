// AuditLogsPage.tsx
import { Container, Title, Table, Paper, ScrollArea } from "@mantine/core";

interface AuditLog {
  timestamp: string;
  user: string;
  incidentId?: string | number | null;
  action: string;
  description: string;
  ip: string;
}

const AUDIT_LOGS: AuditLog[] = [
  {
    timestamp: "2025-11-19 13:09",
    user: "Max",
    incidentId: "",
    action: "LOGIN",
    description: "User logged in",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:09",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:07",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGIN",
    description: "User logged in",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:06",
    user: "Administrator",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:04",
    user: "Administrator",
    incidentId: "",
    action: "LOGIN",
    description: "User logged in",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:03",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:03",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGIN",
    description: "User logged in",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:03",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 13:01",
    user: "Waleey",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 12:59",
    user: "Waleey",
    incidentId: "",
    action: "LOGIN",
    description: "User logged in",
    ip: "127.0.0.1",
  },

  // From screenshot bottom
  {
    timestamp: "2025-11-19 12:58",
    user: "Samuel Asante Jnr",
    incidentId: 3,
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 12:58",
    user: "Samuel Asante Jnr",
    incidentId: 3,
    action: "ESCALATE",
    description: "Incident 3 escalated due to SLA breach",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-19 12:58",
    user: "Samuel Asante Jnr",
    incidentId: 3,
    action: "RISK_ALERT",
    description: "Risk alert generated for incident 3",
    ip: "127.0.0.1",
  },
  {
    timestamp: "2025-11-17 16:20",
    user: "Samuel Asante Jnr",
    incidentId: "",
    action: "LOGOUT",
    description: "User logged out",
    ip: "127.0.0.1",
  },
];

const AuditLogs = () => {
  return (
    <div style={{ margin: "100px 0" }}>
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Audit Logs
        </Title>

        <Paper withBorder radius="md" shadow="sm">
          <ScrollArea offsetScrollbars>
            <Table>
              <Table.Thead>
                <Table.Tr style={{ backgroundColor: "#f6a623" }}>
                  <Table.Th>Timestamp</Table.Th>
                  <Table.Th>User</Table.Th>
                  <Table.Th>Incident ID</Table.Th>
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>IP</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {AUDIT_LOGS.map((log, index) => (
                  <Table.Tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff7ee" : "white",
                    }}
                  >
                    <Table.Td>{log.timestamp}</Table.Td>
                    <Table.Td>{log.user}</Table.Td>
                    <Table.Td>{log.incidentId || ""}</Table.Td>
                    <Table.Td>{log.action}</Table.Td>
                    <Table.Td>{log.description}</Table.Td>
                    <Table.Td>{log.ip}</Table.Td>
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

export default AuditLogs;
