/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CourseItem from '../../components/siswa/CourseItem'
import { coursesFetchData } from '../../actions/courses';

class CourseList extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let content;
    if (this.props.hasErrored) {
      content =  <p>Sorry! There was an error loading the items</p>;
    } else if (this.props.isLoading) {
      content =  <p>Loading…</p>;
    } else {
      content = <div>
        {this.props.courses.length > 0 && this.props.courses.map(item => (
          <CourseItem key={item._id} item={item} />
        ))}
      </div>
    }
    return (
      <div>
        <h2>COURSE</h2>
        {content}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  courses: state.courses.courses,
  hasErrored: state.courses.hasErrored,
  isLoading: state.courses.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(coursesFetchData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseList);
