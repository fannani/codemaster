import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import Score from '../models/Score';
import User from '../models/User';
import PlayerLevel from '../models/PlayerLevel';
import Player from '../models/Player';
import UserType from './UserType';
import CourseType from './CourseType';

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  description: 'This represent a Player',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    user: {
      type: GraphQLNonNull(UserType),
      async resolve({ _id }) {
        return await User.findOne({ userdetailid: _id });
      },
    },
    energy: { type: GraphQLNonNull(GraphQLInt) },
    address: { type: GraphQLString },
    friends: { type: GraphQLList(GraphQLID) },
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
    course: {
      type: GraphQLList(CourseType),
      async resolve({ _id }) {
        const score = await Player.findById(_id);
        return await score.getCourse();
      },
    },
    level: {
      type: GraphQLInt,
      async resolve({ _id }) {
        const player = await Player.findById(_id);
        return await player.level();
      },
    },
    birthday: { type: GraphQLNonNull(GraphQLString) },
    exp: { type: GraphQLInt },
    target_exp: { type: GraphQLInt, async resolve({ _id }) {} },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default PlayerType;
