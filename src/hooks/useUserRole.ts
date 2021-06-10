import { useState } from 'react';
import { UserRole } from '../models/UserRole';
import { useMedikChainApi } from './useMedikChainApi';

export function useUserRole(): { role: UserRole; updateUserRole: () => void } {
  const { canEdit, canGiveAccess, isRegistered } = useMedikChainApi();
  const [role, setRole] = useState(UserRole.GUEST);

  const isAdmin = () =>
    canGiveAccess().then((isAdminResultArray) => isAdminResultArray[0]);
  const isEditor = () =>
    canEdit().then((isEditorResultArray) => isEditorResultArray[0]);
  const isPatient = () =>
    isRegistered().then(
      (isRegisteredResultArray) => isRegisteredResultArray[0]
    );

  const updateUserRole = () => {
    isAdmin().then((admin) => {
      if (admin) {
        setRole(UserRole.ADMINISTRATOR);
      } else {
        isEditor().then((editor) => {
          if (editor) {
            setRole(UserRole.PHYSICIAN);
          } else {
            isPatient().then((patient) => {
              if (patient) {
                setRole(UserRole.PATIENT);
              }
            });
          }
        });
      }
    });
  };
  return { role, updateUserRole };
}
