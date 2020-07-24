function notaFiscal() {
    let valorTotalNotaFiscal = 0
    let valorUnitarioProdutoMaisCaro = 0
    let nomeDoProdutoComMaiorQuantidadeComprada = ""
    let ProdutoComMaiorQuantidadeComprada = 0 
    let categoriaAlimento = 0 
    let categoriaLimpeza = 0
    let categoriaOutros = 0
    let categoriaMaiorIndiceDeCompras = ""

    while(true){ 
       
        // Fase 1 e 2.
        let codigoDoProduto = prompt("Digite o código do produto.")

        // Condição de parada.
        if(codigoDoProduto.substr(0,1) !== "c"){
            break
        }
        
        let nomeDoProduto = prompt("Digite o nome do produto.")
        
        let valorUnitarioDoProduto =  prompt("Digite o valor unitário do produto.")
        valorUnitarioDoProduto = parseFloat(valorUnitarioDoProduto)
        
        let quantidadeDeUnidadesDoProduto =  prompt("Digite a quantidade de unidades compradas desse produto.")
        quantidadeDeUnidadesDoProduto = parseInt(quantidadeDeUnidadesDoProduto)
        
        let categoriaDoProduto = prompt("Informe a categoria do produto.")
        
        let valorTotalReferenteAoProduto = valorUnitarioDoProduto * quantidadeDeUnidadesDoProduto
        
        // Fase 3.

        if(valorUnitarioDoProduto >= valorUnitarioProdutoMaisCaro){
            valorUnitarioProdutoMaisCaro = valorUnitarioDoProduto
            alert("Valor unitario produto mais caro " + valorUnitarioProdutoMaisCaro)
        }

        if(quantidadeDeUnidadesDoProduto > ProdutoComMaiorQuantidadeComprada){
            ProdutoComMaiorQuantidadeComprada = quantidadeDeUnidadesDoProduto
            nomeDoProdutoComMaiorQuantidadeComprada = nomeDoProduto
            alert("O nome do produto com maior quantidade é: " + nomeDoProdutoComMaiorQuantidadeComprada)
        }

        if(categoriaDoProduto === "alimento"){
            categoriaAlimento = categoriaAlimento + quantidadeDeUnidadesDoProduto
        }else if(categoriaDoProduto === "limpeza"){
            categoriaLimpeza = categoriaLimpeza + quantidadeDeUnidadesDoProduto
        }else{
            categoriaOutros = categoriaOutros + quantidadeDeUnidadesDoProduto
        }

        // alert(valorTotalReferenteAoProduto)
        // valorTotalNotaFiscal += valorTotalReferenteAoProduto
        valorTotalNotaFiscal = valorTotalNotaFiscal + valorTotalReferenteAoProduto
        // alert(valorTotalNotaFiscal)     
    }

    if(categoriaAlimento > categoriaLimpeza){
        if(categoriaAlimento > categoriaOutros){ 
            categoriaMaiorIndiceDeCompras = "alimento"
        }else if(categoriaAlimento === categoriaOutros){
            categoriaMaiorIndiceDeCompras = "As categorias alimento e outros possuem os maiores índice de compras."
        } else {
            categoriaMaiorIndiceDeCompras = "outros"
        }
    } else if(categoriaLimpeza > categoriaAlimento){
        if(categoriaLimpeza > categoriaOutros){ 
            categoriaMaiorIndiceDeCompras = "limpeza"
        }else if(categoriaLimpeza === categoriaOutros){
            categoriaMaiorIndiceDeCompras = "As categorias limpeza e outros possuem os maiores índices de compras."
        }else {
            categoriaMaiorIndiceDeCompras = "outros"
        }
    } else if(categoriaOutros >= categoriaAlimento){
        if(categoriaOutros > categoriaAlimento){
            categoriaMaiorIndiceDeCompras = "outros"
        } else {
            categoriaMaiorIndiceDeCompras = "Todas as categorias possuem o mesmo índice de compras." 
        }
    }else {
        categoriaMaiorIndiceDeCompras = "As categorias limpeza e alimento possuem os maiores índices de compras."
    } 

    alert("O valor toda da nota fiscal é: " + valorTotalNotaFiscal + "R$")

    // Fase 4

    let tipoDePagamento = prompt("O cliente deseja pagar em dinheiro ou parcelamento?")

    if(tipoDePagamento === "dinheiro"){
        valorTotalNotaFiscal = (valorTotalNotaFiscal/100) * 95 
    }else{
        valorTotalNotaFiscal = valorTotalNotaFiscal + (valorTotalNotaFiscal/100) * 10
        let quantidadeDeParcelas = prompt("Em quantas parcelas será o pagamento?")
        let valorDaParcela = valorTotalNotaFiscal/quantidadeDeParcelas
        alert("O valor de cada parcela é: " + valorDaParcela)
    }
    
    // Resultado Final / Verificações 

    alert("O programa parou.")
    alert("O valor toda da nota fiscal é: " + valorTotalNotaFiscal + "R$")
    alert("O produto mais caro custa " + valorUnitarioProdutoMaisCaro + "R$")
    alert("O nome do produto com maior quantidade é: " + nomeDoProdutoComMaiorQuantidadeComprada)
    alert("A categoria com maior índice de compras é: " + categoriaMaiorIndiceDeCompras)
    alert("categoria alimento: " + categoriaAlimento)
    alert("categoria limpeza: " + categoriaLimpeza)
    alert("categoria outros: " + categoriaOutros)
}