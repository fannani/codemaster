import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Content from '../../components/admin/Content';

const Home = () => (
  <div className="container-fluid">
    <div className="row">
      <Sidebar />
      <Content />
    </div>
  </div>
);

export default Home;
