const http = require('http')
const URL = require('url')
const data = require('./urls.json')

http.createServer((req, resp) => {
    const { name, url, del } = URL.parse(req.url, true).query

    // all resources
    if(!name || !url){
        return resp.end('show all')
    }
    if(del){
        return resp.end('delete')
    }
    return resp.end('create')
}).listen(3000, () => console.log("API is running."))