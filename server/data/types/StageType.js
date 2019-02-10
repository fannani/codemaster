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
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    teory: { type: GraphQLNonNull(GraphQLString) },
    time: { type: GraphQLNonNull(GraphQLString) },
    win: { type: GraphQLBoolean},
    imageid: { type: GraphQLString },
    course: {
      type: CourseType,
      async resolve({ _id }){
          let stage = await Stage.findOne({ _id });
          let course = await Course.findOne({ _id: stage.course });
          return course;
      },
    },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default StageType;
