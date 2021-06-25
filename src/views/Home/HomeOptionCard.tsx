import {
  Card,
  CardActions,
  CardContent,
  Fab,
  Typography,
} from '@material-ui/core';
import { ArrowForwardIos } from '@material-ui/icons';
import { ReactNode } from 'react';
import './HomeOptionCard.css';

interface HomeOptionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

export function HomeOptionCard(props: HomeOptionCardProps) {
  return (
    <Card className="home-option-card">
      <CardContent className="home-option-card-content">
        <div className="home-option-card-icon">{props.icon}</div>
        <Typography
          className="home-option-card-title"
          variant="h5"
          color="primary"
        >
          {props.title}
        </Typography>
        <Typography className="home-option-card-description">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions className="home-option-card-actions">
        <Fab size="medium" color="primary" onClick={props.onClick}>
          <ArrowForwardIos />
        </Fab>
      </CardActions>
    </Card>
  );
}
