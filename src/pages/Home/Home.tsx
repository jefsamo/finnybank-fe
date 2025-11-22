/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppShell,
  Card,
  Center,
  Container,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAuth } from "../../hooks/useAuth";
import { fetchIncidents, type Incident } from "../../services/project.services";
import { useEffect, useState } from "react";

const IncidentStatCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <Card
    shadow="sm"
    radius="md"
    withBorder
    padding="xl"
    style={{
      minHeight: 160,
    }}
  >
    <Stack gap="md" align="center" justify="center">
      <Text fw={700} fz="lg" c="orange">
        {label}
      </Text>
      <Text fw={700} fz={40}>
        {value}
      </Text>
    </Stack>
  </Card>
);

const Home = () => {
  const { user } = useAuth();

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const totalIncidents = incidents?.length;
  const openIncidents = incidents.filter(
    (incident: Incident) => incident?.status?.toLowerCase() === "open"
  );
  const escalatedIncidents = incidents.filter(
    (incident: Incident) => incident?.status?.toLowerCase() === "escalated"
  );
  const resolvedIncidents = incidents.filter(
    (incident: Incident) => incident?.status?.toLowerCase() === "resolved"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <AppShell.Main>
        <Container size="lg" py="xl">
          {/* Welcome text */}
          <Stack gap="xs" mb="xl">
            <Title order={2} fw={700}>
              {`Welcome, ${user?.firstName ?? "John"} ${
                user?.lastName ?? "Doe"
              }`}
            </Title>
            <Text fz="sm">
              Use the navigation menu to manage incidents and reports.
            </Text>
          </Stack>

          {/* Stats cards */}
          <SimpleGrid cols={4} spacing="lg">
            <IncidentStatCard label="Total Incidents" value={totalIncidents} />
            <IncidentStatCard
              label="Open Incidents"
              value={openIncidents?.length}
            />
            <IncidentStatCard
              label="Escalated"
              value={escalatedIncidents.length}
            />
            <IncidentStatCard
              label="Resolved"
              value={resolvedIncidents.length}
            />
          </SimpleGrid>
        </Container>
      </AppShell.Main>
    </div>
  );
};

export default Home;
