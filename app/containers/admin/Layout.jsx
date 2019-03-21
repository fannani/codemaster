import React, { Suspense } from 'react';
import Header from '../../components/admin/Header';
import Sidebar from '../../components/admin/Sidebar';
import LoadingScreen from '../../components/LoadingScreen';
import {RouteAdmin} from '../../config/route';



const Layout = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-9 ">
          <Suspense fallback={<LoadingScreen />}>
            <RouteAdmin />
          </Suspense>
        </main>
      </div>
    </div>
  </div>
);
export default Layout;
