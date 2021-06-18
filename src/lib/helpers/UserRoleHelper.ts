import { UserRole } from '../types/UserRole';

export function canEdit(role: UserRole): boolean {
  switch (role) {
    case UserRole.ADMIN:
    case UserRole.PHYSICIAN:
      return true;
  }
  return false;
}
