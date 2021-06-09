import { useState } from 'react';
import { UserRole } from '../models/UserRole';
import { useMedikChainApi } from './useMedikChainApi';

export function useUserRole() {
  const { canEdit, canGiveAccess, isRegistered } = useMedikChainApi();
  const [role, setRole] = useState(UserRole.GUEST);

  isRegistered().then((isRegisteredResultArray: boolean[]) => {
    if (isRegisteredResultArray[0]) {
      setRole(UserRole.PATIENT);
    }
  });
  canEdit().then((isEditorResultArray: boolean[]) => {
    if (isEditorResultArray[0]) {
      setRole(UserRole.PHYSICIAN);
    }
  });
  canGiveAccess().then((isAdminResultArray: boolean[]) => {
    if (isAdminResultArray[0]) {
      setRole(UserRole.ADMINISTRATOR);
    }
  });
  return role;
}
