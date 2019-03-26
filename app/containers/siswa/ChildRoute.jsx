import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import usePlayer from '../../hooks/player';
import PropTypes from 'prop-types';
import LoadingScreen from '../../components/LoadingScreen';

const ChildRoute = ({ location, children }) => {
  const player = usePlayer();

  if (player.isLogin) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Switch>{children}</Switch>
      </Suspense>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
};

ChildRoute.propTypes = {
  location: PropTypes.any,
};
ChildRoute.defaultProps = {
  location: null,
};

export default ChildRoute;
