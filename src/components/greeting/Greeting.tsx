import { useState } from 'react';
import { useMedikChainApi } from '../../hooks/useMedikChainApi';

export function Greeting() {
  const { canEdit, canGiveAccess } = useMedikChainApi();
  const [role, setRole] = useState('patient');
  canGiveAccess().then((isAdmin) => {
    if (isAdmin) {
      setRole('administrator');
    } else {
      canEdit().then((isEditor) => isEditor && setRole('physician'));
    }
  });
  return <div>Your are logged as {role}</div>;
}
