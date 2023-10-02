const fs = require('fs');
const http = require('http');
const url = require('url');
// const path = require('path');

// const templateOverview = fs.readFileSync(path.join(__dirname, 'template', 'index.html'), 'utf-8');

// const template = fs.readFileSync(`${__dirname}/template/index.html`, 'utf-8');

// const replaceTemplateEngine = (temp,data)=>{
//     // console.log(data);
//     let title= temp.replace('{%PRODUCT__TITLE%}', data.title);
//     // const description= title.replace('{%PRODUCT__BODY%}', data.body);
//     title = title.replace('{%PRODUCT__BODY%}', data.body);
//     return title;
// };
const replaceTemplateEngine = require('./modules/replaceTemplateEngine');


// const template = fs.readFileSync(`${__dirname}/template/index.html`, 'utf-8');

const template = fs.readFileSync(`${__dirname}/template/card_overview.html`, 'utf-8');
const cardTemplate = fs.readFileSync(`${__dirname}/template/card.html`, 'utf-8');
const cardDetail = fs.readFileSync(`${__dirname}/template/card_detail.html`, 'utf-8');
const productJson = `${__dirname}/data/products/`;
const data = fs.readFileSync(`${productJson}products.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res) => {
    // const pathName = req.url;
    const { query, pathname } = url.parse(req.url, true);
    
    if(pathname === '/'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const card= dataObj.map( product =>
            replaceTemplateEngine( cardTemplate, product )
        );
        const output = template.replace('{%PRODUCT__CARD%}', card);
    res.end(output);
    }else if(pathname === `/product`){
        const detail = replaceTemplateEngine(cardDetail, dataObj[query.id-1])
        res.end(detail);
    }else if(pathname === '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data);
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header' : "My Name"
        });
        res.end('<h1 style="text-align:center;">404 <br> Page not found</h1>');
    }
});

server.listen(8000, '127.0.0.1',() => {
    console.log('Server is running on port 127.0.0.1:8000');
});