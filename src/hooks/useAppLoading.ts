import { selectLoading, setLoading, setNotLoading } from '../state/appLoading';
import { useAppDispatch, useAppSelector } from '../state/hooks';

export function useAppLoading() {
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectLoading);
  const dispatchLoading = () => dispatch(setLoading());
  const dispatchNotLoading = () => dispatch(setNotLoading());
  return { isAppLoading, dispatchLoading, dispatchNotLoading };
}
