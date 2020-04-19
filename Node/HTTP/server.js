const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, resp) => {
    // EXEMPLO 1
    // resp.write("Hello World")
    // resp.end()
   
    //EXEMPLO 2
    // if(req.url === '/'){
    //     return resp.end('<h1>Home Page</h1>')
    // }
    // if(req.url === '/contato'){
    //     return resp.end('<h1>Page Contato</h1>')
    // }

    // EXEMPLO 3
    const file = req.url === '/' ? "index.html" : req.url
    const filePath = path.join(__dirname, 'public', file)

    fs.readFile(
        filePath,
        (err, conteudo) => {
            if(err){
                throw err
            }
            resp.end(conteudo)
        }) 
    // readFile é o cara que irá ler o arquivo. O primeiro argumento dessa função é o
    // caminho do arquivo e o segundo é uma funcao que recebe um erro no primeiro 
    // parametro e o conteudo do arquivo como segundo parametro.

}).listen('5000', () => console.log("Server is running!"))