/* eslint-disable @typescript-eslint/no-unused-vars */
// AppLayoutMain.tsx
import { AppShell } from "@mantine/core";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const AppLayoutMain = () => {
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
      <Header />

      {/* MAIN CONTENT */}
      <Outlet />

      {/* FOOTER */}
      <Footer />
    </AppShell>
  );
};

export default AppLayoutMain;
