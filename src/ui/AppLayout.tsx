/* eslint-disable @typescript-eslint/no-unused-vars */
// HomePage.tsx
import {
  AppShell,
  Group,
  Burger,
  Container,
  Text,
  SimpleGrid,
  Card,
  Title,
  Stack,
  Alert,
  Box,
  Anchor,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck } from "@tabler/icons-react";

const navLinks = [
  "Dashboard",
  "Incidents",
  "Create Incident",
  "Customers",
  "Logout",
];

const NavLink = ({ label }: { label: string }) => (
  <Anchor
    component="button"
    fz="sm"
    fw={600}
    style={{
      color: "#ffa500", // orange-ish
    }}
  >
    {label}
  </Anchor>
);

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

const HomePage = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 50 }}
      padding="md"
      styles={{
        header: {
          backgroundColor: "#000",
          color: "#fff",
        },
        footer: {
          backgroundColor: "#000",
          color: "#fff",
        },
        main: {
          backgroundColor: "#f7f7f7",
          minHeight: "100vh",
        },
      }}
    >
      {/* HEADER */}
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" gap="md">
            <Group gap="xs">
              {/* Simple “logo” block */}
              <Box
                w={40}
                h={40}
                bg="white"
                style={{
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text fw={700} fz="xs" c="black" ta="center">
                  FINNY
                  <br />
                  BANK
                </Text>
              </Box>
              <Text fw={700} fz="lg">
                Finny Bank Incident System
              </Text>
            </Group>

            {/* Desktop nav */}
            <Group visibleFrom="md" gap="lg">
              {navLinks.map((link) => (
                <NavLink key={link} label={link} />
              ))}
            </Group>

            {/* Mobile burger */}
            <Burger
              hiddenFrom="md"
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
              color="white"
            />
          </Group>
        </Container>

        {/* Mobile dropdown */}
        {opened && (
          <Box hiddenFrom="md" bg="#000">
            <Container size="lg">
              <Stack py="sm" gap="xs">
                {navLinks.map((link) => (
                  <NavLink key={link} label={link} />
                ))}
              </Stack>
            </Container>
            <Divider opacity={0.2} />
          </Box>
        )}
      </AppShell.Header>

      {/* MAIN CONTENT */}
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

      {/* FOOTER */}
      <AppShell.Footer>
        <Group justify="center" align="center" h="100%">
          <Text fz="xs" c="dimmed">
            © 2025 Finny Bank. All rights reserved.
          </Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
};

export default HomePage;
