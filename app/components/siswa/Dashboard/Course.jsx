import React from 'react';
import { Query } from 'react-apollo';
import { GET_COURSE_BY_PLAYER } from '../../../queries/player';
import Loader from './Loader';
import CourseItem from '../Course/List/Item';
import Card from '../../UI/Card';

const SiswaDashboardCourse = ({ playerid }) => (
  <Card className="card ">
    <div className="card-body">
      <h5 className="card-title">My Course</h5>
      <Query query={GET_COURSE_BY_PLAYER} variables={{ playerid }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader />;
          if (error) return <p />;
          return (
            <div className="d-flex flex-wrap">
              {data.players[0].course.map(course => (
                <CourseItem key={course._id} item={course} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  </Card>
);

export default SiswaDashboardCourse;
