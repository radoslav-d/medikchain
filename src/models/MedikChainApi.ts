import { MedicalRecord } from './MedicalRecord';
import { PatientInfo } from './PatientInfo';

export interface MedikChainApi {
  grantAdminAccess: (user: string, overrides?: any) => Promise<void>;
  grantEditAccess: (user: string, overrides?: any) => Promise<void>;
  canEdit: () => Promise<boolean[]>;
  canGiveAccess: () => Promise<boolean[]>;
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
  isRegistered: () => Promise<boolean[]>;
  registerAsPatient: (
    name: string,
    birthday: string,
    gender: string
  ) => Promise<void>;
  getPatientsInfo: () => Promise<PatientInfo[][]>;
}
