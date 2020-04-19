// O programa irá guardar no arquivo log.txt algumas mensagens que escolhermos.

const event = require('events')
const fs = require('fs') // Esse módulo nativo do node trabalha com arquivos do sistema
// ou File Systems.
const path = require('path') // Esse módulo nativo do node vai fazer com que independente
// do SO da minha máquina ele pegue o local exato do arquivo que eu disser. 

console.log(event)

const sayHi = new event.EventEmitter() // Esse cara vai ficar ouvindo eventos.

sayHi.on('saudacao', () => console.log('Bom dia, como vai?')) // Aqui dizemos o nome do 
// evento que ele irá ouvir e o que ele fará quando ouvir o nome do evento.

sayHi.emit('saudacao') // Aqui chamamos o evento.

const eventoLogger = new event.EventEmitter()

eventoLogger.on('log', (message) => {
    // console.log(message))
    fs.appendFile(path.join(__dirname, 'log.txt'), message, err => {
        if(err){ 
            throw err
        }
    }) // O método appendFile() recebe o nome do arquivo que ele irá
    // escrever, a mensagem que será escrita, e por ultimo uma função(callback) que será 
    // executada depois que a mensagem for escrita, essa funcao recebe por padrao o parametro
    // erro.
    // OBS: ao invez de colocarmos './log.txt' como caminho, colocaremos path.join() pois 
    // essa funcao conseguirá achar o caminho do arquivo independente do SO que estivermos
    // usando.
})

eventoLogger.emit('log', "Mensagem qualquer.")

// Para deixarmos um pouco mais dinâmico e podermos exportar esse evento para outro arquivo,
// podemos colocar dentro de uma função.
function log(message){
    return eventoLogger.emit('log', message)
}

module.exports = log