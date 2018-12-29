/* eslint-disable */
import React, { Component } from 'react';
import CourseItem from '../../components/siswa/CourseItem';
import { Query } from 'react-apollo';
import { GET_COURSES } from '../../graphql/coursesQuery';

class CourseList extends Component {
  render() {
    return (
      <div>
        <h2 style={{marginLeft : '30px',fontSize:'40px'}}>All Course</h2>
        <Query query={GET_COURSES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <div className="d-flex flex-wrap">
                {data.courses.map(course => (
                  <CourseItem key={course._id} item={course} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default CourseList