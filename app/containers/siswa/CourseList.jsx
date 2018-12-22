/* eslint-disable */
import React, { Component } from 'react';
import CourseItem from '../../components/siswa/CourseItem';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_COURSES = gql`
  {
    courses {
      _id
      name
    }
  }
`;
class CourseList extends Component {
  render() {
    return (
      <div>
        <h2>COURSE</h2>
        <Query query={GET_COURSES}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <div>
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