/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Container,
  Title,
  Table,
  Paper,
  ScrollArea,
  Center,
  Loader,
  Alert,
  Group,
  Button,
  Textarea,
  Text,
} from "@mantine/core";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  fetchIncident,
  markAsResolved,
  updateIncident,
  type Incident,
  type UpdateIncidentAction,
} from "../../services/project.services";
import { useParams } from "react-router-dom";

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchIncident(id);
        setIncident(data);
      } catch (err: any) {
        console.error(err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load incident";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Center>
          <Loader />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg" py="xl">
        <Alert
          icon={<IconAlertTriangle size={16} />}
          color="red"
          variant="light"
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!incident) {
    return (
      <Container size="lg" py="xl">
        <Alert color="yellow" variant="light">
          Incident not found.
        </Alert>
      </Container>
    );
  }
  const handleUpdate = async (action: UpdateIncidentAction) => {
    if (!id) return;

    try {
      setUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(null);

      const updated = await updateIncident(id, {
        resolutionNotes,
        action,
      });

      setIncident(updated);
      setUpdateSuccess(
        action === "save" ? "Incident updated." : "Incident updated and closed."
      );
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update incident";
      setUpdateError(msg);
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (value?: string) =>
    value ? new Date(value).toLocaleString() : "";

  const rows: { label: string; value: string }[] = [
    { label: "Reference ID", value: String(incident.referenceId || "1111") },
    { label: "Customer Name", value: incident.customerName },
    { label: "Phone Number", value: incident.phoneNumber },
    { label: "Product / Service", value: incident.productService },
    { label: "Case Type", value: incident.caseType },
    { label: "Urgency", value: incident.urgency },
    { label: "Status", value: incident.status },
    { label: "Source", value: incident.source },
    { label: "SLA Breached", value: incident.slaBreached ? "Yes" : "No" },
    { label: "Has Escalation", value: incident.hasEscalation ? "Yes" : "No" },
    { label: "Created At", value: formatDate(incident.createdAt) },
    { label: "Last Updated", value: formatDate(incident.updatedAt) },
    { label: "Time To Resolve", value: formatDate(incident.timeToResolve) },
    { label: "User ID", value: incident.userId },
  ];

  const handleSaveAndClose = async () => {
    if (!id) return;

    try {
      setUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(null);

      const resolvedIncident = await markAsResolved(id);

      setIncident(resolvedIncident);

      setUpdateSuccess("Incident updated and closed.");
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update and close incident";
      setUpdateError(msg);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ margin: "50px 0" }}>
      <Container size="lg" py="xl">
        <Title order={2} mb="lg">
          Incident {incident.referenceId}
        </Title>

        <Paper withBorder shadow="sm" radius="md">
          <ScrollArea>
            <Table verticalSpacing="md">
              <Table.Tbody>
                {rows
                  .filter((row) => row.value && row.value !== "Invalid Date")
                  .map((row) => (
                    <Table.Tr key={row.label}>
                      <Table.Td
                        style={{
                          width: 220,
                          backgroundColor: "#f6a623",
                          fontWeight: 600,
                        }}
                      >
                        {row.label}
                      </Table.Td>
                      <Table.Td>{row.value}</Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
        </Paper>
        <br />
        <br />
        {/* 🔽 New: Update Incident section */}

        {incident.status === "Open" && (
          <div>
            <Title order={3} mb="sm">
              Update Incident
            </Title>

            <Paper withBorder radius="md" shadow="sm" p="lg" mb="lg">
              {updateSuccess && (
                <Alert
                  mb="md"
                  color="green"
                  icon={<IconCheck size={16} />}
                  variant="light"
                  withCloseButton
                  onClose={() => setUpdateSuccess(null)}
                >
                  {updateSuccess}
                </Alert>
              )}

              {updateError && (
                <Alert
                  mb="md"
                  color="red"
                  icon={<IconAlertTriangle size={16} />}
                  variant="light"
                  withCloseButton
                  onClose={() => setUpdateError(null)}
                >
                  {updateError}
                </Alert>
              )}

              <Text fw={500} mb="xs">
                Resolution Details / Notes
              </Text>

              <Textarea
                minRows={4}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.currentTarget.value)}
                placeholder="Enter resolution details or notes..."
              />

              <Group mt="md">
                <Button
                  style={{ backgroundColor: "#f6a623" }}
                  loading={updating}
                  onClick={() => handleUpdate("save")}
                >
                  Save
                </Button>
                <Button
                  style={{ backgroundColor: "#f6a623" }}
                  loading={updating}
                  onClick={() => handleUpdate("send_close")}
                >
                  Send &amp; Close
                </Button>
                <Button
                  style={{ backgroundColor: "#f6a623" }}
                  loading={updating}
                  onClick={handleSaveAndClose}
                >
                  Save &amp; Close
                </Button>
              </Group>
            </Paper>
          </div>
        )}
      </Container>
    </div>
  );
};

export default IncidentDetail;
