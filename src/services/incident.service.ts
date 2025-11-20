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

export const createIncident = async (payload: CreateIncidentDto) => {
  const res = await api.post("/incident", payload);
  return res.data;
};
