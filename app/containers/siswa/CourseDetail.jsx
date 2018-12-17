import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { stagesFetchData, getStageByIdCourse } from '../../actions/stages';

class CourseDetail extends Component {
  componentDidMount() {
    this.props.getStageByIdCourse(this.props.match.params.courseid);
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
        {this.props.stages.map(item => (
          <li key={item._id}>
            <Link to={`/play/${item._id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  stages: state.stages.stages,
  hasErrored: state.stages.hasErrored,
  isLoading: state.stages.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(stagesFetchData(id)),
  getStageByIdCourse: courseid => dispatch(getStageByIdCourse(courseid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseDetail);
