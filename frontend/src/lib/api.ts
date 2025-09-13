import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8002/api";

export interface PatientData {
  patientName?: string;
  socialSecurity?: string;
  phoneNumber?: string;
  physician?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  primaryDx?: string;
  secondaryDx?: string;
  allergy?: string;
  height?: string;
  weight?: string;

  flowRate?: string;
  hoursOfUse?: string;
  deliveryDevice?: string;

  emergencyContact?: string;
  emergencyPhone?: string;
  evacuationRelativeNameAndPhone?: string;
  hotelNameAndPhone?: string;
  shelterLocation?: string;
  otherDescription?: string;
  priorityLevel?: string;

  pharmacyName?: string;
  pharmacyAddress?: string;
  pharmacyPhone?: string;

  insuranceCompanyName?: string;
  policyNumber?: string;
  employerName?: string;
  medicareNumber?: string;
  patientNumber?: string;
  serviceEndDate?: string;
  [key: string]: unknown;
}

export interface MedicationRow {
  startDate: string;
  cN: string;
  medication: string;
  doseRoute: string;
  frequency: string;
  purpose: string;
  cdcDate: string;
}

export interface PDFGenerationPayload {
  patientData: PatientData;
  medicationRows?: MedicationRow[];
}

export async function generatePDF(
  payload,
  patientName: string = "Unknown"
) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pdf/generate`,
      payload,
      {
        responseType: "blob",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `E-SOC-Form-${patientName}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (error) {
    console.error('PDF Generation Error:', error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error('Invalid patient data provided');
      } else if (error.response?.status === 500) {
        throw new Error('PDF generation failed on server');
      }
    }

    throw new Error('Failed to generate PDF');
  }
}