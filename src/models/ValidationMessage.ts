export interface ValidationMessage {
  message: string;
  severity: ValidationMessageSeverity;
}

export enum ValidationMessageSeverity {
  ERROR,
  WARNING,
}

export function hasErrors(validationMessages: ValidationMessage[]): boolean {
  return validationMessages.some(
      (message) => message.severity === ValidationMessageSeverity.ERROR
  );
}
