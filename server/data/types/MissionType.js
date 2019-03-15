import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';
import StageType from './StageType';
import Stage from '../models/Stage';
import Mission from '../models/Mission';
const MissionType = new GraphQLObjectType({
  name: 'Mission',
  description: 'This represent a Mission',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    stage: {
      type: StageType,
      resolve: ({ _id }) => {
        return new Promise((resolve, reject) => {
          Mission.findOne({ _id }, (err, stage) => {
            Stage.findOne({ _id: stage.stage }, (err, stage) => {
              resolve(stage);
            });
          });
        });
      },
    },
    quest: { type: GraphQLNonNull(GraphQLString) },
    testcase: { type: GraphQLList(GraphQLID) },
    params: { type: GraphQLList(GraphQLString) },
    score: { type: GraphQLNonNull(GraphQLInt) },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default MissionType;
