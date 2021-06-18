import { useState } from 'react';
import { UserRole } from '../lib/types/UserRole';
import { useMedikChainApi } from './useMedikChainApi';

export function useUserRole(): { role: UserRole; updateUserRole: () => Promise<void> } {
  const { canEdit, canGiveAccess, isRegistered } = useMedikChainApi();
  const [role, setRole] = useState(UserRole.GUEST);

  const isAdmin = async () => (await canGiveAccess())[0];
  const isEditor = async () => (await canEdit())[0];
  const isPatient = async () => (await isRegistered())[0];

  const updateUserRole = async () => {
    const admin = await isAdmin();
    if (admin) {
      setRole(UserRole.ADMIN);
      return;
    }
    const editor = await isEditor();
    if (editor) {
      setRole(UserRole.PHYSICIAN);
      return;
    }
    const patient = await isPatient();
    patient && setRole(UserRole.PATIENT);
  };
  return { role, updateUserRole };
}
