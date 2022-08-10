var randomNumber = 42
var userGuess = ''
var displayInfo = {}
var displayNumber = 0
var isNewGameAllowed = false

setDisabledElements()
handleNewGame()

/* 
    Função chamada na inicialização da página e ao clicar no botão 'NOVA PARTIDA'
    A partir da API fetch nativa do Javascript, uma requisição GET é realizada ao endpoint fornecido
    na descrição do problema. Qualquer status de retorno diferente de 200 faz com que o display seja
    renderizado como erro. Caso contrário, o valor aleatório recebido é salvo e o display é exibido
    com os valores zerados de inicialização.
*/
async function handleNewGame(){
    const response = await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${lowerLimit}&max=${upperLimit}`)
    
    if(response.status !== 200){
        changeDisplay(textDisplay['error'], response.status)
        return
    }
    
    const data = await response.json()

    randomNumber = data.value
    changeDisplay(textDisplay['default'], 0)
}

/*
    Ao clicar no botão 'ENVIAR', a seguinte função é chamada. A partir do palpite dado pelo usuário,
    o display é atualizado conforme especificação e a variável que armazena o palpite (userGuess) é zerada.
*/
function handleGuessSubmit(event){
    event.preventDefault()

    const guess = Number(userGuess)
    let id = ''
    userGuess = ''

    if (randomNumber === guess) {
        id = 'success'
    }
    else if (randomNumber < guess) {
        id = 'less'
    }
    else {
        id = 'greater'
    }

    changeDisplay(textDisplay[id], guess)
    addLedDisplay()
}

/*
    Sempre que o usuário digita algum caracter númerico no campo de input, essa função é chamada. Caso
    o input seja menor do que o limite inferior, o campo é zerado. Caso seja maior que o limite superior,
    um alerta é emitido para notificar o usuário. Se o input não se encaixa em nenhum desses casos, significa
    que o valor é válido e a váriavel do palpite é atualizada. Ao fim, os elementos correspondentes são
    atualizados.
*/
function handleGuessInput(input){
    const value = Number(input.value)

    if (value < lowerLimit){
        userGuess = ''
    }
    else if (value > upperLimit){     
        alert(`O número deve ser menor ou igual a ${upperLimit}`)
    }
    else {
        userGuess = input.value
    }

    setDisabledElements()
}

/*
    Função responsável por definir se determinados elementos devem ser habilitados para o usuário, a partir
    do estado atual do jogo. Além disso, define o valor exibido no campo de input como o palpite armazenado
    no momento.
*/
function setDisabledElements(){
    const NewGameButton = document.querySelectorAll('.newGameButton')[0]
    NewGameButton.disabled = !isNewGameAllowed

    const GuessInput = document.querySelectorAll('.guessInput')[0]
    GuessInput.disabled = isNewGameAllowed
    GuessInput.value = userGuess

    const GuessSubmit = document.querySelectorAll('.guessSubmit')[0]
    GuessSubmit.disabled = (userGuess === '' || isNewGameAllowed)
}

/*
    Na constante "ledLight" são definidos os números correspondentes a um LED estar acesso ou não. Caso o segmento
    de LED se ative para aquele dígito, é verificado se um novo jogo é permitido, já que é apenas nessa situação
    que o segmento pode assumir as cores de sucesso ou erro.
*/
function getLedType(key, className, digit){
    if (ledLight[key][className].includes(digit)){
        if (isNewGameAllowed){
            return displayInfo.id
        }
        
        return 'active'
    }

    return 'disabled'
}

/*
    Função responsável por renderizar o LED de 7 segmentos de acordo com o palpite atual do usuário.

    O LED é divido em 3 partes: top, middle e bottom. As divs 'top' e 'bottom' são divididas em outras 3 partes,
    uma para cada LED. Como a div 'middle' só possui um LED, não é necessário que ele tenha um elemento filho.
    Para que cada div tivesse o formato de LED apresentado no figma, a manipulação via .css foi suficiente.

    Inicialmente, o palpite atual do usuário é transformado em string para ele possa ser convertido em um array
    iterável. Para cada dígito, um LED diferente é renderizado. O elemento pai (displayNumber) é sempre resetado.

    A partir da lógica implementada na função getLedType(), a cor de cada segmento é definida para que o dígito
    desejado seja formado.
*/
function addLedDisplay(){
    const displayNumberElement = document.getElementById('displayNumber')
    displayNumberElement.innerHTML = ''

    const digits = String(displayNumber).split('')

    for (const digit of digits){
        const ledNumber = document.createElement('div')
        ledNumber.className = 'ledNumber'
    
        Object.keys(ledLight).forEach((key) => {
            const newZone = document.createElement('div')
            newZone.className = key
    
            if (key !== 'middle'){
                Object.keys(ledLight[key]).forEach(secKey => {       
                    const newLedSegment = document.createElement('div')
                    newLedSegment.className = secKey

                    const style = getLedType(key, secKey, digit)
                    newLedSegment.style.borderTopColor = ledDisplayColor[style]

                    newZone.appendChild(newLedSegment)
                })
            }
            else {
                const style = getLedType(key, key, digit)
                newZone.className += ` ${style}`
                newZone.style.background = ledDisplayColor[style]
            }
    
            ledNumber.appendChild(newZone)
        })
    
        displayNumberElement.appendChild(ledNumber)
    }
}

/*
    A partir da constante "textDisplay", o parâmetro "gameState" dessa função é definido. A partir dele, o LED
    de 7 segmentos e o texto acima dele é atualizado, bem como algumas variáveis globais que armazenam o estado
    atual do jogo. A cor do texto também é atualizada de acordo com esse estado.
*/
function changeDisplay(gameState, number){
    displayNumber = number
    displayInfo = gameState
    isNewGameAllowed = (gameState.id === 'success' || gameState.id === 'error')
    
    setDisabledElements()
    addLedDisplay()

    const displayTextElement = document.getElementById('displayText')
    displayTextElement.style.color = gameState.color
    displayTextElement.textContent = gameState.text
}