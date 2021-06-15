import { MedicalRecord } from '../types/MedicalRecord';

export function getFormattedDate(record: MedicalRecord) {
  return new Date(record.date * 1000).toUTCString();
}
