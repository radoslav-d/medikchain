import {
  Chip,
  Fab,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
} from '@material-ui/core';
import { Add, Fingerprint, HowToReg, List, Wc } from '@material-ui/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PatientInfo } from '../../lib/types/PatientInfo';
import './PatientOverview.css';

interface PatientOverviewProps {
  patientInfo: PatientInfo;
}

export function PatientOverview(props: PatientOverviewProps) {
  const history = useHistory();
  const match = useRouteMatch();

  const onAdd = () => history.push(`${match.url}/new/${props.patientInfo.id}`);
  const onView = () => history.push(`${match.url}/${props.patientInfo.id}`);

  return (
    <ListItem>
      <ListItemIcon>
        <HowToReg color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={props.patientInfo.name}
        secondary={<PatientSecondaryInfo patientInfo={props.patientInfo} />}
      />
      <ListItemSecondaryAction>
        <Tooltip
          title="Add new medical record for this patient"
          placement="left"
        >
          <Fab
            className="patient-item-action"
            onClick={onAdd}
            color="primary"
            size="small"
          >
            <Add />
          </Fab>
        </Tooltip>
        <Tooltip
          title="Review medical records for this patient"
          placement="right"
        >
          <Fab
            className="patient-item-action"
            onClick={onView}
            color="primary"
            size="small"
          >
            <List />
          </Fab>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

function PatientSecondaryInfo(props: PatientOverviewProps) {
  return (
    <div className="patient-secondary-info">
      <Chip
        size="small"
        icon={<Fingerprint />}
        label={props.patientInfo.nationalId}
        color="primary"
        variant="outlined"
      />
      <Chip
        size="small"
        icon={<Wc />}
        label={props.patientInfo.gender}
        color="primary"
        variant="outlined"
      />
    </div>
  );
}
