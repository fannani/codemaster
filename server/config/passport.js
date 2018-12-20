import User from '../data/models/User';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'iloveskripsisobad',
    },
    function(jwtPayload, cb) {
      return User.findById(jwtPayload._id) //ga perlu
        .then(user => {
          return cb(null, user);
        })
        .catch(err => {
          return cb(err);
        });
    },
  ),
);
