import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAccount } from './hooks/useAccount';
import { canEdit } from './lib/helpers/UserRoleHelper';
import { AddRecordForm } from './views/AddRecordForm/AddRecordForm';
import { DetailedRecord } from './views/DetailedRecord/DetailedRecord';
import { GrantAccess } from './views/GrantAccess/GrantAccess';
import { Home } from './views/Home/Home';
import { Navigation } from './components/Navigation/Navigation';
import { PatientRegister } from './views/PatientRegister/PatientRegister';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { RecordList } from './views/RecordList/RecordList';
import { SelectPatient } from './views/SelectPatient/SelectPatient';
import { useUserRole } from './hooks/useUserRole';
import { UserRole } from './lib/types/UserRole';

export function Router() {
  const { userRole, fetchUserRole } = useUserRole();
  const { account } = useAccount();
  useEffect(() => {
    fetchUserRole();
  }, [account, fetchUserRole]);

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <PrivateRoute
          path="/patient-records/new/:patientAddress"
          redirectPath="/"
          callback={() => canEdit(userRole)}
        >
          <AddRecordForm />
        </PrivateRoute>
        <Route path="/patient-records/:patientAddress/:medicalRecordId">
          <DetailedRecord />
        </Route>
        <Route path="/patient-records/:patientAddress">
          <RecordList />
        </Route>
        <PrivateRoute
          path="/patient-records"
          redirectPath="/"
          callback={() => canEdit(userRole)}
        >
          <SelectPatient />
        </PrivateRoute>
        <PrivateRoute
          path="/give-access"
          redirectPath="/"
          callback={() => userRole === UserRole.ADMIN}
        >
          <GrantAccess />
        </PrivateRoute>
        <PrivateRoute
          path="/register"
          redirectPath="/"
          callback={() => userRole === UserRole.GUEST}
        >
          <PatientRegister onRegister={fetchUserRole} />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
