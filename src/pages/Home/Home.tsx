import {
  Alert,
  AppShell,
  Card,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

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
  return (
    <div>
      <AppShell.Main>
        <Container size="lg" py="xl">
          {/* Success alert */}
          <Alert
            icon={<IconCheck size={18} />}
            color="green"
            variant="light"
            mb="lg"
            withCloseButton={false}
          >
            Logged in successfully.
          </Alert>

          {/* Welcome text */}
          <Stack gap="xs" mb="xl">
            <Title order={2} fw={700}>
              Welcome, Samuel Asante Jnr!
            </Title>
            <Text fz="sm">
              Use the navigation menu to manage incidents and reports.
            </Text>
          </Stack>

          {/* Stats cards */}
          <SimpleGrid cols={4} spacing="lg">
            <IncidentStatCard label="Total Incidents" value={3} />
            <IncidentStatCard label="Open Incidents" value={0} />
            <IncidentStatCard label="Escalated" value={1} />
            <IncidentStatCard label="Resolved" value={2} />
          </SimpleGrid>
        </Container>
      </AppShell.Main>
    </div>
  );
};

export default Home;
