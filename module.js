const fs = require('fs');
const http = require('http');
const url = require('url');
const product = require("./data/product.json");

http.createServer((req,res)=>{
    const parseURL = url.parse(req.url,true);
    if(parseURL.pathname == "/")
    {
        res.write("<h1>Welcome to Home Page we hope to see you here again</h1>");
        fs.writeFileSync("logFile.txt",Date.now()+": user visited home page ");
        res.end();
    }
    else if(parseURL.pathname == "/about")
    {
        res.write("<p>We are the market entity which aim to follow their work before any other thing");
        res.end();
    }
    else if(parseURL.pathname == "/product")
    {
        const pName = parseURL.query.product_name;
        console.log(pName);
        
        product.map(value=>{
            if(value.p_name==pName)
            {
                res.statusCode=200;
                res.setHeader('Content-type','text/html');
                res.write(`<ul><li>Product Name - ${value.p_name}</li>
                    <li>Product Prize - ${value.p_prize}</li>
                    <li>Product Qauntity - ${value.p_quantity}</li>
                    </ul>`);
               
            }
        })

        // console.log("-----",req.url.query);
        res.end();
        
    }
}).listen(8000);
