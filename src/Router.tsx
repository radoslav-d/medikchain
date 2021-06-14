import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AddRecordForm } from './components/add-record-form/AddRecordForm';
import { DetailedRecord } from './components/detailed-record/DetailedRecord';
import { GrantAccess } from './components/grant-access/GrantAccess';
import { Home } from './components/home/Home';
import { Navigation } from './components/navigation/Navigation';
import { PatientRegister } from './components/patient-register/PatientRegister';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import { RecordList } from './components/record-list/RecordList';
import { SelectPatient } from './components/select-patient/SelectPatient';
import { useUserRole } from './hooks/useUserRole';
import { canEdit, UserRole } from './models/UserRole';

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
