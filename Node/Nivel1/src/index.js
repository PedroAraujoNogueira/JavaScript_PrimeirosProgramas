// Aqui criaremos um servidor HTTP.

const express = require('express')
const { uuid, isUuid } = require('uuidv4')

const app = express()

// Por padrão o express não interpreta o que enviamos para ele em JSON, para dizermos ao express que queremos receber informações no formato de JSON usamos o express.json()  
app.use(express.json()) // O método use() é usado quando queremos adicionar alguma função que todas as rotas vão ter que passar por essa função.


app.get('/', (req, resp) => {
    // Todo retorno da rota precisa sempre utilizar o parametro 'resp'.

    return resp.json({ message: 'Hello World'}) // No json sempre deve ser retornado um Array ou um Objeto. 
    
    // return resp.send('Hello World!') // O método send() permite enviar um texto.
})

//---- Exemplo usando métodos HTTP. --------------

app.get('/projects', (request, response) => {
    // const query = request.query
    // console.log(query)

    // Usando Desestruturação.
    const { title, owner } = request.query // Query Params.
    console.log(title)
    console.log(owner)

    return response.send([
        'project 1',
        'project 2',
    ])
})

app.post('/projects', (request, response) => {
    
    // const body = request.body
    //  console.log(body)

    // Usando a Desestruturação.
    const { title, owner } = request.body
    console.log(title)
    console.log(owner)

    return response.send([
        'project 1',
        'project 2',
        'project 3'
    ])
})

app.put('/projects/:id', (request, response) => { // Os ":" significa que vamos receber um parametro de rota(Route params) para indicar qual projeto queremos atualizar.
    
    const params = request.params // Route Params.
    console.log(params)

    // Usando Desestruturação.
    const { id } = request.params
    console.log(id)

    return response.send([
        'project 4',
        'project 2',
        'project 3'
    ])
})

app.delete('/projects/:id', (request, response) => { // Os ":" significa que vamos receber um parametro de rota(Route params) para indicar qual projeto queremos deletar.
    return response.send([
        'project 2',
        'project 3'
    ])
})


// Para rodar a aplicação devemos colocar no terminal: node src/index.js, o nome do arquivo não precisa ser index.js, poderia ser qualquer outro nome com a extensão .js

// ------------------------------- Aplicação funcional --------------------------

const projects = []

function logRequests1(request, response, next){
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()} ${url}]`

    console.log(logLabel) // Mostra quais métodos e rotas da aplicação estão sendo chamados.

    return next() // Chama o próximo middleware.
}

function logRequests(request, response, next){
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()} ${url}]`

    console.time(logLabel) 
    console.log('1')

    next() // Chama o próximo middleware.
    
    console.log('2') 
    console.timeEnd(logLabel)
}

function validateProjectId(request, response, next){
    const { id } = request.params

    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.'})
    }

    return next()
}

app.use(logRequests) // Aplica esse middleware para todas as rotas que estiverem abaixo da linha de código dele.

app.use('/projects1/:id', validateProjectId) // Aqui o middlware só será aplicado nas rotas que tiverem o padrão '/projects/:id'. Podemos anexar quantos middlewares quiser, sendo separados por virgula.

app.get('/projects1', logRequests1, (request, response) => {
    console.log('3')
    
    const { title } = request.query

    const results = title ? 
        projects.filter(project => project.title.includes(title)) : projects
        // O método includes() determina se uma string pode ser encontrada dentro de outra string, retornando true ou false, conforme apropriado.

    return response.json(results)
})

app.post('/projects1', (request, response) => {
    const { title, owner } = request.body
    
    const project = { id: uuid(), title, owner }
    
    projects.push(project)
    
    return response.json(project)
})

app.put('/projects1/:id', validateProjectId, (request, response) => {
    const { id } = request.params
    const { title, owner } = request.body

    // const project = projects.find(project => project.id === id) // O método find() retorna o valor do primeiro elemento do array que satisfizer a função de teste provida. Caso contrario, undefined é retornado.

    const projectIndex = projects.findIndex(project => project.id === id) // O método findIndex() retorna o índice no array do primeiro elemento que satisfizer a função de teste provida. Caso contrário, retorna -1, indicando que nenhum elemento passou no teste.

    if(projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.'})
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects1/:id', validateProjectId, (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return response.status(400).json({ error: 'Project not found.' })
    }

    projects.splice(projectIndex, 1) // Remove 1 elemento a partir do índice projectIndex.
    // Outro exemplo usando splice seria: 
    // remove 0 elementos a partir do índice 2, e insere "drum"
    // var removed = myFish.splice(2, 0, "drum");

    return response.status(204).send() // Quando é uma responsa que não tem conteúdo é recomendado que enviemos com o código 204.
})
        
app.listen((3333), () => {
    console.log('back-end started!') // Essa mensagem será colocada no terminal toda vez que subirmos o servidor.
}) 