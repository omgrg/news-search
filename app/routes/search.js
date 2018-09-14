import {Router} from 'express';
import SearchController from '../controllers/SearchController';
import {check} from 'express-validator/check';

const router = Router();
const searchController = new SearchController();

router.post('/search',[ check('search').isLength({min:2})],searchController.search);
router.get('/search',function(req, res, next){
    res.render('home');
});
router.get('/page/:page',searchController.page);

export default router;
