import api from "../api";

export interface CreateIncidentDto {
  customerName: string;
  phoneNumber: string;
  productService: string;
  source: string;
  caseType: string;
  urgency: string;
  firstFourCardDigits?: string;
  lastFourCardDigits?: string;
  comment?: string;
  status?: string;
}

export interface Incident {
  _id: string;
  referenceId: string;
  phoneNumber: string;
  createdAt: string;
  customerName: string;
  caseType: string;
  productService: string;
  urgency: string;
  status: string;
  assignedTo: string;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  departmentId?: string;
  roles?: string[];
}

export interface Department {
  _id: string;
  name: string;
}

export interface AuditLog {
  _id: string;
  createdAt: string; // or createdAt in your DB
  name: string; // e.g. "Samuel Asante Jnr"
  incidentId?: string | null;
  action: string; // e.g. "LOGIN", "LOGOUT", "ESCALATE"
  description?: string;
  ip?: string; // e.g. "127.0.0.1"
}

export interface Incident {
  _id: string;
  customerName: string;
  phoneNumber: string;
  productService: string;
  caseType: string;
  urgency: string;
  status: string;
  source: string;
  slaBreached: boolean;
  hasEscalation: boolean;
  referenceId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  timeToResolve?: string;
}

export const fetchIncident = async (id: string): Promise<Incident> => {
  const res = await api.get<Incident>(`/incident/${id}`);
  return res.data;
};

// Adjust URL to match your NestJS controller: @Controller('audit-logs')
export const fetchAuditLogs = async (): Promise<AuditLog[]> => {
  const res = await api.get<AuditLog[]>("/audit-logs");
  return res.data;
};
export const fetchDepartments = async (): Promise<Department[]> => {
  const res = await api.get("/department");
  return res.data;
};

export const createIncident = async (payload: CreateIncidentDto) => {
  const res = await api.post("/incident", payload);
  return res.data;
};

export const fetchIncidents = async (): Promise<Incident[]> => {
  const res = await api.get<Incident[]>("/incident");
  return res.data;
};

export const createUser = async (payload: CreateUserDto) => {
  const res = await api.post("/auth/create-user", payload);
  return res.data;
};
