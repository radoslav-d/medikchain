import {
  Chip,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import {
  AddCircleOutline,
  Fingerprint,
  HowToReg,
  List,
  Wc,
} from '@material-ui/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { PatientInfo } from '../../models/PatientInfo';
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
        <IconButton onClick={onAdd}>
          <AddCircleOutline color="primary" />
        </IconButton>
        <IconButton onClick={onView} edge="end">
          <List color="primary" />
        </IconButton>
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
