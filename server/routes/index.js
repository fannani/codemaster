import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../data/schema';
import passport from 'passport/lib';
import auth from './auth';
import client from './client';

const router = express.Router();
router.use('/auth', auth);
router.use(
  '/api',
  graphqlHTTP((req, res) => {
    return new Promise((resolve, reject) => {
      const next = (user, info = {}) => {
        resolve({
          schema,
          graphiql: true,
          context: {
            user: user || null,
          },
        });
      };
      passport.authenticate('jwt', { session: false }, (err, user) => {
        next(user);
      })(req, res, next);
    });
  }),
);
router.use(client);
export default router;
