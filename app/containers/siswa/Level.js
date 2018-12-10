import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { levelsFetchData } from '../../actions/levels';
class Level extends Component {
    componentDidMount() {
        this.props.fetchData();
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
                {this.props.levels.map((item) => (
                    <li key={item.id}>
                        <Link to={  '/stages/'+item.id } >{item.name}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        levels: state.levels.levels,
        hasErrored: state.levels.hasErrored,
        isLoading: state.levels.isLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(levelsFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Level);
