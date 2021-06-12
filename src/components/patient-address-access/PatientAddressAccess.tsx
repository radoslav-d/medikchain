import { isAddress } from '@ethersproject/address';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ReactChild, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useUserRole } from '../../hooks/useUserRole';
import { canEdit } from '../../models/UserRole';
import { BackdropSpinner } from '../backdrop-spinner/BackdropSpinner';
import { NotFound } from '../not-found/NotFound';

interface PatientAddressAccessProps {
  patientRecordAddress: string;
  redirectPath?: string;
  children: ReactChild;
}

export function PatientAddressAccess(props: PatientAddressAccessProps) {
  const { account } = useWeb3React<JsonRpcProvider>();
  const { role, updateUserRole } = useUserRole();
  const [loading, setLoading] = useState(true);

  const allowsRecordView = (patientRecordAddress: string) =>
    account === patientRecordAddress || canEdit(role);

  useEffect(() => {
    updateUserRole().then(() => setLoading(false));
  }, [role, account, updateUserRole]);
  if (loading) {
    return <BackdropSpinner opened={loading} />;
  }
  if (!isAddress(props.patientRecordAddress)) {
    return <NotFound />;
  }
  if (!allowsRecordView(props.patientRecordAddress)) {
    return <Redirect to={props.redirectPath || '/'} />;
  }
  return <div>{props.children}</div>;
}
