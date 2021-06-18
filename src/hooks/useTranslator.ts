import { selectLanguage, setLanguage } from '../state/appLanguage';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import LABELS from '../assets/labels.json';

export function useTranslator() {
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  const changeLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };

  const getAvailableLanguages = (): string[] => {
    return Object.keys(LABELS);
  };

  const translate = (label: string): string => {
    const keys = label.split('.');
    // @ts-ignore
    return getLabelFromKeys(LABELS[language], keys) || label;
  };

  const getLabelFromKeys = (labels: any, keys: string[]): string => {
    if (keys.length === 0) {
      return labels;
    }
    const current = keys.shift();
    // @ts-ignore
    const next = labels[current];
    return next && getLabelFromKeys(next, keys);
  };

  return { language, changeLanguage, getAvailableLanguages, translate };
}
