import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('home');
});

export default router;