import { appEnv } from '../app/env';
import { MedikChainApi } from '../models/MedikChainApi';
import MedikChainAbi from '../contracts/MedikChain.json';
import { useContract } from './useContract';

export function useMedikChainApi(): MedikChainApi {
  const contractAddress = appEnv().mandatory.contractAddress;
  const { functions } = useContract(contractAddress, MedikChainAbi.abi);
  return {
    grantAdminAccess: functions.grantAdminAccess,
    grantEditAccess: functions.grantEditAccess,
    canEdit: functions.canEdit,
    canGiveAccess: functions.canGiveAccess,
    addMedicalRecord: functions.addMedicalRecord,
    getMedicalRecords: functions.getMedicalRecords,
    isRegistered: functions.isRegistered,
    registerAsPatient: functions.registerAsPatient,
    getPatientsInfo: functions.getPatientsInfo,
  };
}
