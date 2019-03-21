import React, { Suspense, lazy } from 'react';
import connect from 'react-redux/es/connect/connect';
import Redirect from 'react-router-dom/es/Redirect';
import Switch from 'react-router-dom/es/Switch';

import PropTypes from 'prop-types';
import LoadingScreen from '../../components/LoadingScreen';

const ChildRoute = ({ isLogin, location, children }) => {
  if (isLogin) {
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
  isLogin: PropTypes.bool.isRequired,
  location: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isLogin: state.users.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(ChildRoute);
