import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import CourseType from './CourseType';
import Stage from '../models/Stage';
import Course from '../models/Course';

const StageType = new GraphQLObjectType({
  name: 'Stage',
  description: 'This represent a Stage',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    teory: { type: new GraphQLNonNull(GraphQLString) },
    time: { type: new GraphQLNonNull(GraphQLString) },
    win: { type: GraphQLBoolean},
    imageid: { type: GraphQLString },
    course: {
      type: CourseType,
      resolve: ({ _id }) => {
        return new Promise((resolve, reject) => {
          Stage.findOne({ _id }, (err, stage) => {
            Course.findOne({ _id: stage.course }, (err, course) => {
              resolve(course);
            });
          });
        });
      },
    },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default StageType;
