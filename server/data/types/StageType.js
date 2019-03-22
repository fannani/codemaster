import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import CourseType from './CourseType';
import Stage from '../models/Stage';
import Course from '../models/Course';
import Mission from '../models/Mission';
import MissionType from './MissionType';

const StageType = new GraphQLObjectType({
  name: 'Stage',
  description: 'This represent a Stage',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    teory: { type: GraphQLString },
    index: { type: GraphQLInt },
    time: { type: GraphQLString },
    win: { type: GraphQLBoolean },
    score: { type: GraphQLInt },
    stars: { type: GraphQLList(GraphQLBoolean) },
    imageid: { type: GraphQLString },
    missions: {
      type: GraphQLList(MissionType),
      async resolve({ _id }) {
        const missions = await Mission.find({ stage: _id });
        return missions;
      },
    },
    course: {
      type: CourseType,
      async resolve({ _id }) {
        let stage = await Stage.findOne({ _id });
        let course = await Course.findOne({ _id: stage.course });
        return course;
      },
    },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default StageType;
