import { MedicalRecord } from "./MedicalRecord";

export interface MedikChainApi {
  grantAdminAccess: (user: string) => Promise<void>;
  grantEditAccess: (user: string) => Promise<void>;
  canEdit: () => Promise<boolean>;
  canGiveAccess: () => Promise<boolean>;
  addMedicalRecord: (
    patientAddress: string,
    physicianAddress: string,
    title: string,
    description: string,
    medicalCenter: string,
    tags: string[],
    attachment: string
  ) => Promise<void>;
  getMedicalRecords: (user: string) => Promise<MedicalRecord[][]>;
}
