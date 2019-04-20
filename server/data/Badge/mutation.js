import { GraphQLNonNull, GraphQLString } from 'graphql';

import BadgeType from './type';
import Badge from './Badge';

const BadgeMutation = {
  addBadge: {
    type: BadgeType,
    description: 'Add Score',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      imageid: { type: GraphQLString },
    },
    async resolve(root, { title, imageid }) {
      return new Promise((resolve, reject) => {
        const newbadge = new Badge({
          title,
          imageid,
        });
        newbadge.save(err => {
          err ? reject(err) : resolve(newbadge);
        });
      });
    },
  },
};

export default BadgeMutation;
