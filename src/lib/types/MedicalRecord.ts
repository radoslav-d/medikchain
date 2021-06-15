export interface MedicalRecord {
  id: number;
  title: string;
  description: string;
  physician: string;
  patient: string;
  date: number;
  medicalCenter: string;
  tags: string[];
  attachment: string;
}
