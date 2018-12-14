import React, {Component} from 'react';
import { Link } from "react-router-dom";


class Sidebar extends Component {
    render() {
        return (
            <nav className="col-3" id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/admin/log">Log</Link>
                        <Link to="/admin/course">Course</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Sidebar;
