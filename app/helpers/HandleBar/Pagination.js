
class Pagination {

    paginate(pagination){
        const totalResult = pagination.totalResults;
        const resultPerPage = pagination.resultPerPage;
        const totalPages = Math.ceil(totalResult/resultPerPage);
        let startPage = 1;
        let endPage = 1;
        let currentPage = parseInt(pagination.currentPage) || 1;

        if(currentPage < 1){
            currentPage = 1;
        }else if(currentPage > totalPages){
            currentPage = totalPages;
        }

       if(totalPages <= 10){
            startPage = 1;
            endPage = totalPages;
       }else{
           if (currentPage <= 6) {
               startPage = 1;
               endPage = 10;
           } else if (currentPage + 4 >= totalPages) {
               startPage = totalPages - 9;
               endPage = totalPages;
           } else {
               startPage = currentPage - 5;
               endPage = currentPage + 4;
           }
       }

        let anchors = "";
       // let anchors = `<a href="#">&laquo;</a>`;
        for(let i=startPage;i<=endPage;i++){
            if(i == currentPage){
                anchors+= `<a href="/page/${i}?q=${pagination.searchTerms}" class="active">${i}</a>`;
            }else{
                anchors+= `<a href="/page/${i}?q=${pagination.searchTerms}">${i}</a>`;
            }

        }
       // anchors += `<a href="#">&raquo;</a>`;

        return anchors;
    }
}

export default Pagination;