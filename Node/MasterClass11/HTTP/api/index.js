const http = require('http')
const URL = require('url')
const fs = require('fs')
const data = require('./urls.json')
const path = require('path')

function writeFile(cb){
    fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        (err) => {
            if(err){
                throw err
            }
            cb(JSON.stringify({ message: "ok"}))
    })
}

http.createServer((req, resp) => {
    // Colocar http://localhost:3000/?name=Google&url=http://google.com&del=1 na url.
    console.log(URL.parse(req.url, true)) 
    const { name, url, del } = URL.parse(req.url, true).query

    resp.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })// Aqui nós estamos dizendo que nossa API pode ser acessada a partir de qualquer 
    // endereço ou porta externa, pois ele está retornando uma permissão de 
    // acesso(Access-Control-Allow-Origin) para qualquer endereço externo(representado por *).

    // all resources
    if(!name || !url){
        return resp.end(JSON.stringify(data))
    }
    if(del){
        // return resp.end('delete')
        data.urls = data.urls.filter((item) => String(item.url) !== String(url))

        return writeFile((message) => resp.end(message)) 
    }

    data.urls.push({ name, url })
    return writeFile((message) => resp.end(message))
}).listen(3000, () => console.log("API is running."))