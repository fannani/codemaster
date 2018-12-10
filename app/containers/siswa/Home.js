import React from 'react';
import Sidebar from '../../components/siswa/Sidebar';
import Content from '../../components/siswa/Content';
import { Route, Switch } from "react-router-dom";
import Level from "../../containers/siswa/Level";
import Stage from "../../containers/siswa/Stage";
import Dashboard from "../../containers/siswa/Dashboard";
import Leaderboard from "../../containers/siswa/Leaderboard";
import Editor from "./Editor";


const Home = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
};

export default Home;
