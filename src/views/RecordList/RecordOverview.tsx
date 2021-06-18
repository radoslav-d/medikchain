import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { EventNote, OpenInNew } from '@material-ui/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useTranslator } from '../../hooks/useTranslator';
import { getFormattedDate } from '../../lib/helpers/DateHelper';
import { MedicalRecord } from '../../lib/types/MedicalRecord';

export function RecordOverview(props: { medicalRecord: MedicalRecord }) {
  const match = useRouteMatch();
  const history = useHistory();
  const { translate } = useTranslator();
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
        <Tooltip title={translate('title.open-record-button')}>
          <IconButton edge="end" onClick={openDetailedView}>
            <OpenInNew />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
