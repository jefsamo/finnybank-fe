import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayoutMain from "./ui/AppLayoutMain";
import Home from "./pages/Home/Home";
import Incidents from "./pages/Incidents/Incidents";
import IncidentDetail from "./pages/IncidentDetail/IncidentDetail";
import CreateIncident from "./pages/CreateIncident/CreateIncident";
import AuditLogs from "./pages/AuditLogs/AuditLogs";
import Reports from "./pages/Reports/Reports";
import CreateUser from "./pages/CreateUser/CreateUser";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./ui/ProtectedRoute";
import Alerts from "./pages/Alerts/Alerts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayoutMain />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/create-incident" element={<CreateIncident />} />
          <Route path="/user-management" element={<CreateUser />} />
          <Route path="/incidents/:id" element={<IncidentDetail />} />
          <Route path="/logs" element={<AuditLogs />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
