import GoogleSearch from '../vendor/GoogleSearch';
import {validationResult} from 'express-validator/check';

class SearchController {

    constructor() {
        this.googleSearch = new GoogleSearch();
        this.search = this.search.bind(this);
        this.page = this.page.bind(this);
    }

    search(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        this.googleSearch.query(req.body.search)
            .then(data => {
                //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
                //res.json(data);
                res.render('home', {
                    result: data
                });
            }).catch(error => {
            res.json(error);
        });
    }

    page(req, res, next) {
        let currentPage = req.params.page || 1;
        let searchTerms = req.query.q;

        this.googleSearch.page(currentPage, searchTerms)
            .then(data => {
                data.pagination.currentPage = currentPage;
                res.render('home', {
                    result: data
                });

            }).catch(error => {
                res.json(error);
        });


    }

}

export default SearchController;