function jogoDaForca(){

    
    let continuarJogando = true
    while(continuarJogando){
        

        // Devem ser previamente cadastradas dez palavras e com cada palavra deve ser cadastrada uma dica;
        let palavras = 
    
        [
            ["circo", "Onde os palhaços trabalham."], 
            ["arroz", "Uma comida comum no almoço."], 
            ["festa", "Lugar onde as pessoas vão para se divertir."], 
            ["camisa", "Uma peça de roupa."], 
            ["geladeira", "Eletrodoméstico usado para conservar alimentos"], 
            ["ventilador", "Usado para combater o calor."], 
            ["cachorro", "O melhor amigo do homem."], 
            ["computador", "Essencial na tecnologia."], 
            ["caneta", "Usado para escrever."], 
            ["estudante", "Ser humano que busca aprender algo."]
            // console.log(palavras[1][1])
        ]
        
        // A palavra a ser acertada deve ser sorteada;
        let numeroAleatorio = Math.round(Math.random() * 9);
        console.log(numeroAleatorio)
        
        let numeroDeTentativas = 1
        
        let palavraSorteada = palavras[numeroAleatorio][0]
        let palavraSorteadaEscondida = []
        let stringPalavraSorteadaEscondida = ""
        
        
        // Montando um array e uma string simulando a quantidade de letras que tem na palavra sorteada. 
        for(let i = 0; i < palavraSorteada.length; i++){
            palavraSorteadaEscondida.push("_")
            stringPalavraSorteadaEscondida = stringPalavraSorteadaEscondida + palavraSorteadaEscondida[i] + " "
            // alert(stringPalavraSorteadaEscondida)
        }
        console.log(palavraSorteadaEscondida)
        
        let letrasTestadas = []
        while(numeroDeTentativas <= 7){
            if(!continuarJogando){
                break
            }

            // As letras já testadas devem ser mostradas e não podem ser testadas mais de uma vez.
            let letraInvalida = true
            let letra = ""
            while(letraInvalida){
                let letraNova = true
                letra = prompt("Escolha uma letra diferente das anteriores: " + letrasTestadas)
                if(letra.length > 1){
                    alert("Por favor coloque uma letra de cada vez.")
                }
                else{
                    for(let i = 0; i < letrasTestadas.length; i++){
                        if(letrasTestadas[i] === letra){
                            alert("Você já testou essa letra. Por favor escolha outra.")
                            letraNova = false
                            break;
                        }
                    }
                    if(letraNova){
                        letraInvalida = false
                        letrasTestadas.push(letra)   
                    }
                }
            }
            
            let letraEncontradaNaPalavra = false
            for(let i = 0; i < palavraSorteada.length; i++){
                if(palavraSorteada[i] === letra){
                    palavraSorteadaEscondida[i] = letra
                    letraEncontradaNaPalavra = true
                }
            }
            console.log(palavraSorteadaEscondida)
            
            stringPalavraSorteadaEscondida = ""
            for(let i = 0; i < palavraSorteadaEscondida.length; i++){
                stringPalavraSorteadaEscondida = stringPalavraSorteadaEscondida + palavraSorteadaEscondida[i] + " "
            }
            console.log(stringPalavraSorteadaEscondida)
            
            if(!letraEncontradaNaPalavra){
                numeroDeTentativas = numeroDeTentativas + 1
            }
            
            let voceAcertou = true
            for(let i = 0; i < palavraSorteada.length; i++){
                if(!(palavraSorteada[i] == palavraSorteadaEscondida[i])){
                    voceAcertou = false
                }
            }
            
            let jogarNovamente = "";
            if(voceAcertou){
                alert("Parabéns você ganhou o jogo!!")
                jogarNovamente = prompt("Para jogar novamente digite sim, caso contrário digite qualquer outra coisa.")
                if(jogarNovamente !== "sim"){
                    continuarJogando = false
                    alert(continuarJogando)
                    continue
                }else{
                    break
                }
            }

            if(numeroDeTentativas === 6){
                alert("Essa é sua última chance, aqui vai uma dica: " + palavras[numeroAleatorio][1])
            }
            
            if(numeroDeTentativas === 7){
                alert("Desculpe você perdeu o jogo!")
                jogarNovamente = prompt("Para jogar novamente digite sim, caso contrário digite qualquer outra coisa.")
                if(jogarNovamente !== "sim"){
                    continuarJogando = false
                    continue
                }else{
                    break
                }
                
            }
            
        }
    }

    alert("Volte sempre!")
}
    
    
    
    
    
    
    
    
    
    
    
    
    