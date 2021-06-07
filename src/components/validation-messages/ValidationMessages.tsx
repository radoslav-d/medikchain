import {
  ValidationMessage,
  ValidationMessageSeverity,
} from "../../models/ValidationMessage";

interface ValidationMessagesProps {
  validationMessages: ValidationMessage[];
}

export function ValidationMessages(props: ValidationMessagesProps) {
  const getColor = (message: ValidationMessage) => {
    switch (message.severity) {
      case ValidationMessageSeverity.ERROR:
        return "red";
      case ValidationMessageSeverity.WARNING:
        return "orange";
    }
  };

  return (
    <div>
      {props.validationMessages.map((message) => (
        <span key={message.message} color={getColor(message)}>
          {message.message}
        </span>
      ))}
    </div>
  );
}
