import { isAddress } from '@ethersproject/address';
import { ReactChild } from 'react';
import { Redirect } from 'react-router-dom';
import { useAccount } from '../../hooks/useAccount';
import { useUserRole } from '../../hooks/useUserRole';
import { canEdit } from '../../lib/helpers/UserRoleHelper';
import { NotFound } from '../NotFound/NotFound';

interface PatientAddressAccessProps {
  patientRecordAddress: string;
  redirectPath?: string;
  children: ReactChild;
}

export function PatientAddressAccess(props: PatientAddressAccessProps) {
  const { account } = useAccount();
  const { userRole } = useUserRole();

  const allowsRecordView = (patientRecordAddress: string) =>
    account === patientRecordAddress || canEdit(userRole);

  if (!isAddress(props.patientRecordAddress)) {
    return <NotFound />;
  }
  if (!allowsRecordView(props.patientRecordAddress)) {
    return <Redirect to={props.redirectPath || '/'} />;
  }
  return <div>{props.children}</div>;
}
