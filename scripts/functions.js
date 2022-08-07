var randomNumber = 42
var userGuess = ''
var displayInfo = {}
var displayNumber = 0
var isReloadAllowed = false

setDisabledElements()
handleNewMatch()

async function handleNewMatch(){
    const response = await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${lowerLimit}&max=${upperLimit}`)
    
    if(response.status !== 200){
        changeDisplay(textDisplayColor['error'], response.status)
        return
    }
    
    const data = await response.json()

    randomNumber = data.value
    changeDisplay(textDisplayColor['default'], 0)
}

function handleUserGuess(event){
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

    changeDisplay(textDisplayColor[id], guess)
    addLedDisplay()
}

function handleNumberInput(input){
    const value = Number(input.value)

    if (value >= lowerLimit && value <= upperLimit){     
        userGuess = String(value)
    }
    else if (value === 0){
        userGuess = ''
    }

    setDisabledElements()
}

function setDisabledElements(){
    const MatchButton = document.querySelectorAll('.newMatchButton')[0]
    MatchButton.disabled = !isReloadAllowed

    const GuessInput = document.querySelectorAll('.guessInput')[0]
    GuessInput.disabled = isReloadAllowed
    GuessInput.value = userGuess

    const GuessSubmit = document.querySelectorAll('.guessSubmit')[0]
    GuessSubmit.disabled = (userGuess === '' || isReloadAllowed)
}

function getLedType(key, className, digit){
    if (ledLight[key][className].includes(digit)){
        if (isReloadAllowed){
            return displayInfo.id
        }
        
        return 'active'
    }

    return 'disabled'
}

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

function changeDisplay(info, number){
    displayNumber = number
    displayInfo = info
    isReloadAllowed = (info.id === 'success' || info.id === 'error')
    
    setDisabledElements()
    addLedDisplay()

    const displayTextElement = document.getElementById('displayText')
    displayTextElement.style.color = info.color
    displayTextElement.textContent = info.text
}