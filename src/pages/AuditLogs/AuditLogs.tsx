/* eslint-disable @typescript-eslint/no-explicit-any */
// AuditLogsPage.tsx
import {
  Container,
  Title,
  Table,
  Paper,
  ScrollArea,
  Center,
  Loader,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchAuditLogs, type AuditLog } from "../../services/project.services";

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAuditLogs();
        setLogs(data);
      } catch (err: any) {
        console.error(err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load audit logs";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  if (loading) {
    return (
      <div style={{ marginTop: "100px" }}>
        <Container size="xl" py="xl">
          <Center>
            <Loader />
          </Center>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Text c="red" mb="md">
          {error}
        </Text>
      </Container>
    );
  }
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
                  {/* <Table.Th>Incident ID</Table.Th> */}
                  <Table.Th>Action</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>IP</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {logs.map((log, index) => (
                  <Table.Tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff7ee" : "white",
                    }}
                  >
                    <Table.Td>{log.createdAt}</Table.Td>
                    <Table.Td>{log.name}</Table.Td>
                    {/* <Table.Td>{log.incidentId || ""}</Table.Td> */}
                    <Table.Td>{log.action}</Table.Td>
                    <Table.Td>{log.description ?? "None"}</Table.Td>
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
