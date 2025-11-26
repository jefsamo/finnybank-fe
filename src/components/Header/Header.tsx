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
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../../hooks/useAuth";
// import { useAuth } from "../hooks/useAuth";

type NavItem = {
  label: string;
  path: string;
  roles?: string[]; // if omitted => visible to all logged-in users
};

const navLinks: NavItem[] = [
  { label: "Dashboard", path: "/dashboard" }, // everyone
  { label: "Incidents", path: "/incidents" }, // everyone
  {
    label: "Create Incident",
    path: "/create-incident",
    roles: ["csa"],
  },
  { label: "Logs", path: "/logs", roles: ["admin", "auditor"] },
  { label: "User management", path: "/user-management", roles: ["admin"] },
  { label: "Alerts", path: "/alerts", roles: ["admin", "supervisor"] },
  {
    label: "Reports",
    path: "/reports",
    roles: ["admin", "supervisor", "auditor"],
  },
];

const NavLink = ({ label, to }: { label: string; to: string }) => (
  <Anchor
    component={Link}
    fz="sm"
    to={to}
    fw={600}
    style={{
      color: "#ffa500", // orange-ish
      textDecoration: "none",
    }}
  >
    {label}
  </Anchor>
);

const Header = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const { logout, isLoggedIn, user } = useAuth();
  const userRoles = user?.roles ?? [];

  // Only show links the user is allowed to see
  const visibleLinks = navLinks.filter((link) => {
    if (!link.roles || link.roles.length === 0) return true; // open to all logged-in users
    return link.roles.some((role) => userRoles.includes(role));
  });

  return (
    <div>
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" gap="md">
            {/* Logo + title */}
            <Group gap="xs">
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
              {visibleLinks.map((link) => (
                <NavLink key={link.path} to={link.path} label={link.label} />
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
                {visibleLinks.map((link) => (
                  <NavLink key={link.path} to={link.path} label={link.label} />
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
