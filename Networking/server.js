const http = require('http');

const server = http.createServer((req, res) => {
    console.log("Request Made");
    console.log(req.url, req.method); 
    
    //Try localhost:3000/about

    //Set Header type to plain
    //res.setHeader('Content-Type', 'text/plain');
    //res.write('hello, ninjas');

    //Set Header type to html
    res.setHeader('Content-Type', 'text/html');
    res.write('<head><>link rel="stylesheet" href="#"></head>');
    res.write('<p>hello, ninjas</p>');
    res.write('<p>goodbye, ninjas</p>');


    res.end();
});

//(port number, host name, ...)
server.listen(3000, 'localhost', () => {
    console.log("Listening for request on port 3000");
});