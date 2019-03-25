import React, { Suspense } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';
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
  location: PropTypes.any.isRequired,
};

export default ChildRoute;
