// O programa que irá mostrar o status da memória do nosso computador.

const os = require('os') // O Node trabalha com commonJS(require/exports). O require serve
// para importar módulos e nesse caso estamos importando um módulo de dentro do próprio 
// Node, ou seja, que ja vem com o Node, nao sendo necessario usar NPM ou algo similar para
// carregar módulos de terceiros.
const log = require('./logger')

setInterval(()=>{

    console.log(os.platform())

    // const freemem = os.freemem
    // const totalmem = os.totalmem
    // Podemos substituir as duas linhas acima pela desestruturação:
    const { freemem, totalmem } = os

    // console.log(freemem(), totalmem()) 
    // Para apresentarmos a memória em megabytes faremos
    console.log(parseInt(freemem() / 1024 / 1024), parseInt(totalmem() / 1024 / 1024)) 

    const percents =
    parseInt(parseInt(freemem() / 1024 / 1024)/ parseInt(totalmem() / 1024 / 1024)*100)

    console.log(percents)

    const stats = {
        free: `${parseInt(freemem() / 1024 / 1024)} MB`,
        total: `${parseInt(totalmem() / 1024 / 1024)} MB`,
        usage: `${percents}%`
    }

    console.clear()
    console.log(stats)
    console.table(stats) // Apresenta os dados em formato de tabela.
    // log("Rodando...")
    log(`${JSON.stringify(stats)}\n`)

}, 1000)


