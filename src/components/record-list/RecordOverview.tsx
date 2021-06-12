import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { EventNote, OpenInNew } from '@material-ui/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getFormattedDate, MedicalRecord } from '../../models/MedicalRecord';

export function RecordOverview(props: { medicalRecord: MedicalRecord }) {
  const match = useRouteMatch();
  const history = useHistory();

  const openDetailedView = () =>
    history.push(`${match.url}/${props.medicalRecord.id}`);

  return (
    <ListItem>
      <ListItemIcon>
        <EventNote />
      </ListItemIcon>
      <ListItemText
        primary={props.medicalRecord.title}
        secondary={getFormattedDate(props.medicalRecord)}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={openDetailedView}>
          <OpenInNew />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
