export enum UserRole {
  GUEST = 'Guest',
  PATIENT = 'Patient',
  PHYSICIAN = 'Physician',
  ADMINISTRATOR = 'Administrator',
}

export function canEdit(role: UserRole): boolean {
  switch (role) {
    case UserRole.ADMINISTRATOR:
    case UserRole.PHYSICIAN:
      return true;
  }
  return false;
}
