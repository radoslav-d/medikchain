import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { EventNote, OpenInNew } from '@material-ui/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { MedicalRecord } from '../../models/MedicalRecord';

export function RecordOverview(props: { medicalRecord: MedicalRecord }) {
  const match = useRouteMatch();
  const history = useHistory();

  const openDetailedView = () =>
    history.push(`${match.url}/${props.medicalRecord.id}`);

  const getDate = () => new Date(props.medicalRecord.date * 1000).toUTCString();

  return (
    <ListItem>
      <ListItemIcon>
        <EventNote />
      </ListItemIcon>
      <ListItemText primary={props.medicalRecord.title} secondary={getDate()} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={openDetailedView}>
          <OpenInNew />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
