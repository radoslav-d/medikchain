import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loading, notLoading, selectLoading } from '../app/appLoading';

export function useAppLoading() {
  const dispatch = useAppDispatch();
  const isAppLoading = useAppSelector(selectLoading);
  const dispatchLoading = () => dispatch(loading());
  const dispatchNotLoading = () => dispatch(notLoading());
  return { isAppLoading, dispatchLoading, dispatchNotLoading };
}
