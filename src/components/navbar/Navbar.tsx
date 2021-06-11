import { JsonRpcProvider } from '@ethersproject/providers';
import { Button } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import { Link, Switch } from 'react-router-dom';
import { useUserRole } from '../../hooks/useUserRole';
import { canEdit, UserRole } from '../../models/UserRole';
import { AddRecordForm } from '../add-record-form/AddRecordForm';
import { GrantAccess } from '../grant-access/GrantAccess';
import { PatientRegister } from '../patient-register/PatientRegister';
import { PrivateRoute } from '../private-route/PrivateRoute';
import { RecordList } from '../record-list/RecordList';
import { SelectPatient } from '../select-patient/SelectPatient';
import { UserInfo } from '../user-info/UserInfo';

export function Navbar() {
  const { role, updateUserRole } = useUserRole();
  useEffect(() => {
    updateUserRole();
  }, [role, updateUserRole]);

  const getRoleOptions = () => {
    switch (role) {
      case UserRole.ADMINISTRATOR:
        return <AdminOptions />;
      case UserRole.PHYSICIAN:
        return <PhysicianOptions />;
      case UserRole.PATIENT:
        return <PatientOptions />;
      case UserRole.GUEST:
      default:
        return <GuestOptions />;
    }
  };
  return (
    <div>
      <UserInfo userRole={role} />
      <div>{getRoleOptions()}</div>
      <Switch>
        <PrivateRoute
          path="/patient-records/new/:patientAddress"
          redirectPath="/"
          callback={() => canEdit(role)}
        >
          <AddRecordForm />
        </PrivateRoute>
        <PrivateRoute
          path="/patient-records/:patientAddress"
          redirectPath="/"
          callback={() => role !== UserRole.GUEST}
        >
          <RecordList />
        </PrivateRoute>
        <PrivateRoute
          path="/patient-records"
          redirectPath="/"
          callback={() => canEdit(role)}
        >
          <SelectPatient />
        </PrivateRoute>
        <PrivateRoute
          path="/give-access"
          redirectPath="/"
          callback={() => role === UserRole.ADMINISTRATOR}
        >
          <GrantAccess />
        </PrivateRoute>
        <PrivateRoute
          path="/register"
          redirectPath="/"
          callback={() => role === UserRole.GUEST}
        >
          <PatientRegister onRegister={updateUserRole} />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

function PatientOptions() {
  const { account } = useWeb3React<JsonRpcProvider>();
  return (
    <Button>
      <Link to={`/patient-records/${account}`}>
        review your medical history
      </Link>
    </Button>
  );
}

function PhysicianOptions() {
  return (
    <span>
      <PatientOptions />
      <Button>
        <Link to={'/patient-records'}>
          Review or add patient medical history
        </Link>
      </Button>
    </span>
  );
}

function AdminOptions() {
  return (
    <span>
      <PhysicianOptions />
      <Button>
        <Link to="/give-access">Give access to a user</Link>
      </Button>
    </span>
  );
}

function GuestOptions() {
  return (
    <div>
      <Button>
        <Link to="/register">Register as patient</Link>
      </Button>
    </div>
  );
}
