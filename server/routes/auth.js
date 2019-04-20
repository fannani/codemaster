import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import Player from '../data/Player/Player';

const router = express.Router();

router.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }
    req.login(user, { session: false }, errlogin => {
      if (errlogin) {
        res.send(errlogin);
      }
      const player = Player.findById(user.userdetail);
      player.daily_login = Date.now();
      const token = jwt.sign(user.toJSON(), 'iloveskripsisobad');
      return res.json({ user, token });
    });
    return null;
  })(req, res);
});

export default router;
