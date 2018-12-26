import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';
import Score from '../models/Score';
import User from '../models/User';
import UserType from './UserType';

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  description: 'This represent a Player',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    user: {
      type: new GraphQLNonNull(UserType),
      async resolve({ _id }) {
        return await User.findOne({userdetailid : _id});
      },
    },
    energy: { type: new GraphQLNonNull(GraphQLInt) },
    address: { type: GraphQLString },
    stars: {
      type: GraphQLInt,
      async resolve({ _id }) {
        let score = await Score.find({ player: _id });
        let mapping = {};
        for (let i = 0; i < score.length; i++) {
          let stars;
          if (mapping[score[i].stage]) stars = mapping[score[i].stage];
          else stars = [false, false, false];
          for (let a = 0; a < 3; a++) {
            if (score[i].stars[a]) {
              stars[a] = true;
            }
          }
          mapping[score[i].stage] = stars;
        }
        let total = 0;
        for (var key in mapping) {
          let stars = mapping[key];
          for (let i = 0; i < 3; i++) {
            if (stars[i]) {
              total++;
            }
          }
        }
        return total;
      },
    },
    birthday: { type: new GraphQLNonNull(GraphQLString) },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerType;
