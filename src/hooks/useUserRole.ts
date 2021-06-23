import { UserRole } from '../lib/types/UserRole';
import { selectUserRole, setUserRole } from '../state/appUserRole';
import { useMedikChainApi } from './useMedikChainApi';
import { useAppDispatch, useAppSelector } from '../state/hooks';

export function useUserRole() {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRole);
  const { canEdit, canGiveAccess, isRegistered } = useMedikChainApi();

  const dispatchSetUserRole = (role: UserRole) => {
    dispatch(setUserRole(role));
  };

  const fetchUserRole = async () => {
    const isAdmin = (await canGiveAccess())[0];
    if (isAdmin) {
      dispatchSetUserRole(UserRole.ADMIN);
      return;
    }
    const isEditor = (await canEdit())[0];
    if (isEditor) {
      dispatchSetUserRole(UserRole.PHYSICIAN);
      return;
    }
    const isPatient = (await isRegistered())[0];
    if (isPatient) {
      dispatchSetUserRole(UserRole.PATIENT);
    }
  };
  return { userRole, fetchUserRole };
}
