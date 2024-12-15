// Lista de personagens para serem sorteados
const characters = [{
    Nome : "Mario",
    Velocidade : 4,
    Manobrabilidade : 2,
    Poder: 2,
    Pontos: 0,
},{
    Nome : "Luigi",
    Velocidade : 3,
    Manobrabilidade : 4,
    Poder: 4,
    Pontos: 0,
},{
    Nome : "Peach",
    Velocidade : 3,
    Manobrabilidade : 4,
    Poder: 2,
    Pontos: 0,
},{
    Nome : "Yoshi",
    Velocidade : 2,
    Manobrabilidade : 4,
    Poder: 3,
    Pontos: 0,
},{
    Nome : "Browser",
    Velocidade : 5,
    Manobrabilidade : 2,
    Poder: 5,
    Pontos: 0,
},{
    Nome : "Donkey Kong",
    Velocidade : 2,
    Manobrabilidade : 2,
    Poder: 5,
    Pontos: 0,
}] 


// Função que sorteia dois personagens para se confrontarem
const sortPlayers = async(player1) =>{
    var number = Math.floor(Math.random() * characters.length) 
    
    if(player1){
       do{
         number = Math.floor(Math.random() * characters.length)

       } while(characters[number] == player1)
    }

    return characters[number]
}

// Função para gerar um numero aleatorio para o dado
const rollDice = async() => {
    return Math.floor(Math.random() * 6) + 1
}

// Função para definir o bloco qeu ocorrerá a rodada
const getRandomBlock = async() => {
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }

    return result
}

//  Função para mostrar os logs dos resultados das disputas em cada rodada 
const logRollResult = async(playerName, block, diceResult, attribute) => {
    console.log(`${playerName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

const playRaceEngine = async(player1, player2) => {
    for (let round = 1; round <= 5; round++){
        console.log(`\n🏁 Rodada ${round}`);
        
        // sortear bloco
        let block  = await getRandomBlock()
        console.log(`Bloco: ${block}`);
        
        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()
        
        // teste de habilidade
        let totalTestSkill1 =  0
        let totalTestSkill2 =  0

        if(block === 'RETA'){
            totalTestSkill1 = diceResult1 + player1.Velocidade
            totalTestSkill2 = diceResult2 + player2.Velocidade

            await logRollResult(
                player1.Nome,
                "velocidade",
                diceResult1,
                player1.Velocidade
            )
            await logRollResult(
                player2.Nome,
                "velocidade",
                diceResult2,
                player2.Velocidade
            )

            
        }

        if(block === 'CURVA'){
            totalTestSkill1 = diceResult1 + player1.Manobrabilidade
            totalTestSkill2 = diceResult2 + player2.Manobrabilidade

            await logRollResult(
                player1.Nome,
                "manobrabilidade",
                diceResult1,
                player1.Manobrabilidade
            )
            await logRollResult(
                player2.Nome,
                "manobrabilidade",
                diceResult2,
                player2.Manobrabilidade
            )

            
            
        }

        if(block === 'CONFRONTO'){
            let powerResult1 = diceResult1 + player1.Poder
            let powerResult2 = diceResult2 + player2.Poder

            console.log(`${player1.Nome} confrontou  com ${player2.Nome}!🥊`);
            
            await logRollResult(
                player1.Nome,
                "poder",
                diceResult1,
                player1.Poder
            )
            await logRollResult(
                player2.Nome,
                "poder",
                diceResult2,
                player2.Poder
            )

            if(powerResult1 > powerResult2 && player2.Pontos > 0){
                player2.Pontos--
                console.log(`${player1.Nome} ganhou o confronto!  ${player2.Nome} perdeu 1 ponto 🐢`);                
            }
          
            if(powerResult2 > powerResult1 && player1.Pontos > 0){
                player1.Pontos--
                console.log(`${player2.Nome} ganhou o confronto!  ${player1.Nome} perdeu 1 ponto 🐢`);
            }
          
            if(powerResult1 === powerResult2){
                console.log("Confronto empatado! Nenhum ponto foi perdido")
            }

        }   
        
             // Verificando o vencedor

             if(block != "CONFRONTO"){

                if (totalTestSkill1 > totalTestSkill2) {
                    console.log(`${player1.Nome} marcou um ponto!`);
                    player1.Pontos++;
                    } else if (totalTestSkill2 > totalTestSkill1) {
                        console.log(`${player2.Nome} marcou um ponto!`);
                        player2.Pontos++;
                    } else {
                        console.log(`Rodada empatada! Nenhum ponto foi marcado.`);
                    }
             }

        

        console.log("--------------------------------------------");
        }   


        
    }


// Função para declarar o campeão 
const declareWinner = async(player1, player2) => {
    console.log(`\n🏁🏆 Corrida finalizada!`);
    console.log(`${player1.Nome}: ${player1.Pontos} pontos`);
    console.log(`${player2.Nome}: ${player2.Pontos} pontos`);

    if (player1.Pontos > player2.Pontos) {
        console.log(`${player1.Nome} é o grande vencedor! 🏅`);
    } else if (player2.Pontos > player1.Pontos) {
        console.log(`${player2.Nome} é o grande vencedor! 🏅`);
    } else {
        console.log(`Empate! Ambos mostraram um desempenho incrível! 🤝`);
    }


}

(main = async() => {
 
    
    var player1 = await sortPlayers(false)
    var player2 = await sortPlayers(player1)

    

    console.log(
        `🏁🚨 Corrida entre ${player1.Nome} e ${player2.Nome} iniciada!... \n`
    )

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})();

