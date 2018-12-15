import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { coursesFetchData } from '../../actions/courses';
class CourseList extends Component {
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
                {this.props.courses.map((item) => (
                    <li key={item._id}>
                        <Link to={  '/course/'+item._id } >{item.name}</Link>
                    </li>
                ))}
            </ul>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        courses: state.courses.courses,
        hasErrored: state.courses.hasErrored,
        isLoading: state.courses.isLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(coursesFetchData())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
