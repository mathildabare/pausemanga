console.log('Page blog');
/////////// Pagination /////////// 


let nbArticles;
let numPerPage = 8;
let page = parseInt(req.query.page, 10) || 1;
let numPages;
let skip = (page-1) * numPerPage;
let limit = skip + ',' + numPerPage;

const allArticles = `SELECT count(*) as nbArticles FROM articles`;

db.query(allArticles, (error, results, fields) => {
    nbArticles = results[0].nbArticles;
    numPages = Math.ceil(nbArticles / numPerPage);
  
    // console.log(numPerPage)
})


const articles = `SELECT * FROM articles`

db.query(articles, (error, results, fields) => {


    if (page <= numPages) {

        const Pagination = {
            current: page,
            first : page = 1,
            previous: page > 0 ? page - 1 : undefined,
            next: page < numPages ? page + 1 : undefined,
            last: page = numPages
        }
        res.render('article', {
            articles: results,
            page: Pagination
        })
    } else {
        res.redirect('article')
    }
})



A____A 
|・ㅅ・|
|っ　ｃ| 
|　　　| 
|　　　| 
|　　　| 
|　　　| 
|　　　| 
 U￣￣U