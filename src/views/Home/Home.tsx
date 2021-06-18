import { Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { useTranslator } from '../../hooks/useTranslator';
import HOME_SCREEN_TEXTS from '../../assets/home-screen-texts.json';
import './Home.css';

export function Home() {
  const { translate } = useTranslator();
  return (
    <div className="home">
      {HOME_SCREEN_TEXTS.labels.map((label) => (
        <Typography
          key={label.key}
          variant={label.variant as Variant}
          color="primary"
          className={label.className}
        >
          {translate(`home-screen-labels.${label.key}`)}
        </Typography>
      ))}
    </div>
  );
}
