import React, {Component} from 'react';
import {stagesFetchData} from "../../actions/stages";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";

class Stage extends Component {
    componentDidMount() {
        this.props.fetchData(this.props.match.params.stageid);
    }
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <ul>
                {this.props.stages.map((item) => (
                    <li key={item._id}>
                        <Link to={  '/stage/'+item._id } >{item.title}</Link>
                    </li>
                ))}
            </ul>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        stages: state.stages.stages,
        hasErrored: state.stages.hasErrored,
        isLoading: state.stages.isLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(stagesFetchData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Stage);

