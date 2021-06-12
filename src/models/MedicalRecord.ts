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

export function getFormattedDate(record: MedicalRecord) {
  return new Date(record.date * 1000).toUTCString();
}
