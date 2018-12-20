import { GraphQLID, GraphQLList } from 'graphql';
import CourseType from '../types/CourseType';
import Course from '../models/Course';

const courses = {
  type: new GraphQLList(CourseType),

  description: 'List of all Course',
  resolve: (_, args, context) => {
    // if (!context.user) {
    //   throw new Error('You are not authorized!');
    // }
    return new Promise((resolve, reject) => {
      Course.find({}, function(err, courses) {
        err ? reject(err) : resolve(courses);
      });
    });
  },
};

export default courses;
