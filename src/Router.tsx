import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
  const { role, updateUserRole } = useUserRole();
  useEffect(() => {
    updateUserRole();
  }, [role, updateUserRole]);
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <PrivateRoute
          path="/patient-records/new/:patientAddress"
          redirectPath="/"
          callback={() => canEdit(role)}
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
          callback={() => canEdit(role)}
        >
          <SelectPatient />
        </PrivateRoute>
        <PrivateRoute
          path="/give-access"
          redirectPath="/"
          callback={() => role === UserRole.ADMIN}
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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
