import { ReactChild } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  redirectPath: string;
  children: ReactChild;
  callback: () => boolean;
}

export function PrivateRoute(props: PrivateRouteProps) {
  if (props.callback()) {
    return <Route path={props.path}>{props.children}</Route>;
  }
  return <Redirect to={props.redirectPath} />;
}
