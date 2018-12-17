import React from 'react';
import Sidebar from '../../components/siswa/Sidebar';
import Content from '../../components/siswa/Content';

const Home = () => (
  <div className="container-fluid">
    <div className="row">
      <Sidebar />
      <Content />
    </div>
  </div>
);

export default Home;
