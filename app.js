const http = require('http');

const fs = require('fs');

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<head><title>my first response </title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    } 
    if (url ==='/message' && method=='POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            // console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('./usersData/message.txt', message, (err) => {
                if(err){
                    console.log('ERROR: ', err);
                }
                res.statusCode=302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });  
        
    }
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>my first response </title></head>');
    res.write('<body><h1>my first response </h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);
