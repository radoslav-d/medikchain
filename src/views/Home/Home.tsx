import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import LABELS from '../../assets/home-screen-texts.json';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      {LABELS.en.map((label) => (
        <Typography
          variant={label.variant as Variant}
          color="primary"
          className={label.className}
        >
          {label.content}
        </Typography>
      ))}
    </div>
  );
}
