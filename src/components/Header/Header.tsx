/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Anchor,
  AppShell,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const navLinks = [
  "Dashboard",
  "Incidents",
  "Create Incident",
  "Logs",
  "User management",
  "Reports",
  // "Logout",
];

const NavLink = ({ label, to }: { label: string; to: string }) => (
  <Anchor
    component={Link}
    fz="sm"
    to={to}
    fw={600}
    style={{
      color: "#ffa500", // orange-ish
    }}
  >
    {label}
  </Anchor>
);

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);

  const navigate = useNavigate();

  const { logout, isLoggedIn } = useAuth();

  return (
    <div>
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
                <NavLink
                  key={link}
                  to={"/" + link.replace(/\s+/g, "-").toLowerCase()}
                  label={link}
                />
              ))}
              {isLoggedIn && (
                <Button
                  style={{ backgroundColor: "#f6a623" }}
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              )}
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
                  <NavLink
                    key={link}
                    to={"/" + link.replace(/\s+/g, "-").toLowerCase()}
                    label={link}
                  />
                ))}
              </Stack>
            </Container>
            <Divider opacity={0.2} />
          </Box>
        )}
      </AppShell.Header>
    </div>
  );
};

export default Header;
