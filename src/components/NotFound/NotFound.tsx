import { Typography } from '@material-ui/core';
import { Filter, Filter4 } from '@material-ui/icons';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-icons">
        <Filter4 fontSize="large" color="primary" />
        <Filter fontSize="large" color="primary" />
        <Filter4 fontSize="large" color="primary" />
      </div>
      <Typography color="primary" variant="h3">
        Opps.. This resource is not found!
      </Typography>
    </div>
  );
}
