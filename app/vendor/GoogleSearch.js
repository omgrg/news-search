import googleConfig from '../config/google';
import request from "request-promise";

class GoogleSearch {

    constructor() {
        this.key = googleConfig.key;
        this.cx = googleConfig.cx;
        this.uri = `https://www.googleapis.com/customsearch/v1?key=${this.key}&cx=${this.cx}`;
    }

    query(query) {

        let promise = new Promise((resolve,reject)=>{
            let options = {
                method: 'GET',
                uri: `${this.uri}&q=${query}`
            };

            let _self = this;

            request(options)
                .then(function (response) {
                    let results;
                    results = _self.build(response);
                    resolve(results);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });

        return promise;

    }

    page(pageNumber,searchTerms){
        let promise = new Promise((resolve,reject)=>{
            let options = {
                method: 'GET',
                uri: `${this.uri}&q=${searchTerms}&start=${pageNumber}`
            };

            let _self = this;

            request(options)
                .then(function (response) {
                    let results;
                    results = _self.build(response);
                    resolve(results);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });

        return promise;
    }

    build(response){
        let res = JSON.parse(response);
        let data = res.items;
        let pagination ={};
        let results = {};
        results.searchInformation = {};

        results.data = data.map(item => {
            return {
                "title": item.title,
                "snippet": item.snippet,
                'htmlSnippet' : item.htmlSnippet,
                'link': item.link
            };
        });

        if(res.queries.previousPage){
            res.queries.previousPage.forEach(item => {
                pagination.previousPage = item.startIndex;
                pagination.resultPerPage = item.count;
            });
        }

        if(res.queries.nextPage){
            res.queries.nextPage.forEach(item => {
                pagination.nextPage = item.startIndex;
                pagination.resultPerPage = item.count;
            });
        }

        if(res.searchInformation){
            results.searchInformation.searchTime = res.searchInformation.formattedSearchTime;
            results.searchInformation.totalResults = res.searchInformation.formattedTotalResults;


        }

        if(res.queries.request){
            res.queries.request.forEach(item => {
                pagination.totalResults = item.totalResults;
            });
        }

        if(res.queries.request){
            res.queries.request.forEach(item => {
                results.searchInformation.searchTerms = item.searchTerms;
                pagination.searchTerms = item.searchTerms;
            });
        }

        results.pagination = pagination;
        return results;
    }
}

export default GoogleSearch;