var randomNumber=42,userGuess="",displayInfo={},displayNumber=0,isNewGameAllowed=!1;async function handleNewGame(){const e=await fetch(`https://us-central1-ss-devops.cloudfunctions.net/rand?min=${lowerLimit}&max=${upperLimit}`);if(200!==e.status)return void changeDisplay(textDisplay.error,e.status);const s=await e.json();randomNumber=s.value,changeDisplay(textDisplay.default,0)}function handleGuessSubmit(e){e.preventDefault();const s=Number(userGuess);let t="";userGuess="",t=randomNumber===s?"success":randomNumber<s?"less":"greater",changeDisplay(textDisplay[t],s),addLedDisplay()}function handleGuessInput(e){const s=Number(e.value);s<lowerLimit?userGuess="":s>upperLimit?alert(`O número deve ser menor ou igual a ${upperLimit}`):userGuess=e.value,setDisabledElements()}function setDisabledElements(){document.querySelectorAll(".newGameButton")[0].disabled=!isNewGameAllowed;const e=document.querySelectorAll(".guessInput")[0];e.disabled=isNewGameAllowed,e.value=userGuess;document.querySelectorAll(".guessSubmit")[0].disabled=""===userGuess||isNewGameAllowed}function getLedType(e,s,t){return ledLight[e][s].includes(t)?isNewGameAllowed?displayInfo.id:"active":"disabled"}function addLedDisplay(){const e=document.getElementById("displayNumber");e.innerHTML="";const s=String(displayNumber).split("");for(const t of s){const s=document.createElement("div");s.className="ledNumber",Object.keys(ledLight).forEach((e=>{const l=document.createElement("div");if(l.className=e,"middle"!==e)Object.keys(ledLight[e]).forEach((s=>{const a=document.createElement("div");a.className=s;const n=getLedType(e,s,t);a.style.borderTopColor=ledDisplayColor[n],l.appendChild(a)}));else{const s=getLedType(e,e,t);l.className+=` ${s}`,l.style.background=ledDisplayColor[s]}s.appendChild(l)})),e.appendChild(s)}}function changeDisplay(e,s){displayNumber=s,displayInfo=e,isNewGameAllowed="success"===e.id||"error"===e.id,setDisabledElements(),addLedDisplay();const t=document.getElementById("displayText");t.style.color=e.color,t.textContent=e.text}setDisabledElements(),handleNewGame();
//# sourceMappingURL=index.17137322.js.map
