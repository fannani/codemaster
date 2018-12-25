import express from 'express';
import path from 'path';

const router = express.Router();

router.get(['/admin', '/admin/*'], (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/admin.html'));
});
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/player.html'));
});

export default router;
