/* eslint-disable */
import React, { Component } from 'react';
import CourseItem from '../../components/siswa/CourseItem';
import { Query } from 'react-apollo';
import { GET_COURSES } from '../../graphql/coursesQuery';
import ContentLoader, { Facebook } from 'react-content-loader';

const Loader = () => {
  const content = (
    <div
      className="card m-2"
      style={{
        width: '200px',
        height: '250px',
        borderRadius: '10px !important',
        border: '0',
      }}
    >
      <ContentLoader width={200} height={250}>
        <circle cx="100" cy="80" r="60" />
        <rect x="20" y="160" rx="4" ry="4" width="160" height="15" />
        <rect x="20" y="185" rx="4" ry="4" width="160" height="15" />
        <rect x="20" y="210" rx="4" ry="4" width="130" height="15" />
      </ContentLoader>
    </div>
  );
  let all = [];
  for (let i = 0; i < 6; i++) {
    all.push(content);
  }
  return (
    <div>
      <div className="d-flex flex-wrap">{all}</div>
    </div>
  );
};
class CourseList extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <main
            className="col-12 main-container"
            style={{ maxWidth: '1100px' }}
          >
            <div>
              <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>
                All Course
              </h2>
              <Query query={GET_COURSES}>
                {({ loading, error, data }) => {
                  if (loading) return <Loader />;
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
          </main>
        </div>
      </div>
    );
  }
}
export default CourseList;
