import { AppShell, Group, Text } from "@mantine/core";

const Footer = () => {
  return (
    <div>
      <AppShell.Footer>
        <Group justify="center" align="center" h="100%">
          <Text fz="xs" c="dimmed">
            © 2025 Finny Bank. All rights reserved.
          </Text>
        </Group>
      </AppShell.Footer>
    </div>
  );
};

export default Footer;
