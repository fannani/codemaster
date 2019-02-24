import { GraphQLID, GraphQLList } from 'graphql';
import MissionType from '../types/MissionType';
import Mission from '../models/Mission';

const missions = {
  type: new GraphQLList(MissionType),
  description: 'List of all Mission',
  args: {
    stage: { type: GraphQLID },
  },
  resolve: function(parent, args) {
    return new Promise((resolve, reject) => {
      Mission.find(args, (err, missions) => {
                err ? reject(err) : resolve(missions)
            })
    });
  },
};
export default missions;
