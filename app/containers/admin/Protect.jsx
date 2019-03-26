import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAdmin from '../../hooks/admin';
import LoadingScreen from '../../components/LoadingScreen';
import Sidebar from '../../components/admin/Sidebar';

const Protect = ({ location, children }) => {
  const admin = useAdmin();
  if (admin.isLogin || true) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-9 ">
              <Suspense fallback={<LoadingScreen />}>
                <Switch>{children}</Switch>
              </Suspense>
            </main>
          </div>
        </div>
      </>
    );
  }
  return (
    <Redirect
      to={{
        pathname: '/admin/login',
        state: { from: location },
      }}
    />
  );
};

Protect.propTypes = {
  location: PropTypes.any,
};
Protect.defaultProps = {
  location: null,
};

export default Protect;
