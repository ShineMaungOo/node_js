const fs = require('fs');
const http = require('http');
// const path = require('path');

// const templateOverview = fs.readFileSync(path.join(__dirname, 'template', 'index.html'), 'utf-8');

// const template = fs.readFileSync(`${__dirname}/template/index.html`, 'utf-8');

const template = fs.readFileSync(`${__dirname}/template/index.html`, 'utf-8');

const productJson = `${__dirname}/data/products/`;
const data = fs.readFileSync(`${productJson}products.json`, 'utf-8');
const dataObj = JSON.parse(data);
const server = http.createServer((req,res) => {
    const pathName = req.url;
    if(pathName === '/'){
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
    res.end(template);
    }else if(pathName === '/product'){
        res.end('<h1>This is the product page.</h1>');
    }else if(pathName === '/api'){
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