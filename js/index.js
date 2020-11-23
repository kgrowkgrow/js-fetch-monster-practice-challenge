/* 
congrats you did it! now: 
you gotta make a form with buttons and so on

*/

const MONSTERURL = "http://localhost:3000/monsters"



const body = document.querySelector("body")
body.dataset.pageNumber = 1

const monsterContainer = document.getElementById('monster-container')

const navButtons = body.querySelectorAll("button")
const createButton = body.querySelector("#create-monster")


document.addEventListener("DOMContentLoaded",() => {

    addCreateButtonToPage()

    populateMonsters(1)

    body.addEventListener("click", event => {
        if (event.target.tagName != "BUTTON") {return}
        
        const pageNum = parseInt(body.dataset.pageNumber)
        if (event.target.id === "back") {
            pressBackButton(pageNum)
        } else if (event.target.id === "forward") {         
            pressForwardButton(pageNum)
        }
        
    })
})

function makeMonsterCard(monster) {
    
    //h2 name, h4 age, p description

    

    const monsterDiv = document.createElement("div")

    const h2 = document.createElement("h2")
    h2.textContent = `${monster.name}`

    const h4 = document.createElement("h4")
    h4.textContent = `${monster.age}`

    const p = document.createElement("p")
    p.textContent = `${monster.description}`



    monsterDiv.appendChild(h2)
    monsterDiv.appendChild(h4)
    monsterDiv.appendChild(p)

    monsterContainer.appendChild(monsterDiv)
}

function populateMonsters(pageNum){
    const start = 0 + ((pageNum -1) * 50)
    const end = start + 50
    console.log(start,end)
    fetch(MONSTERURL)
    .then(resp => resp.json())
    .then(json => {
        
        let pageMonsters = json.slice(start, end)
        
       
        pageMonsters.forEach(monster => {  
            makeMonsterCard(monster)  
        })
    })
}

function pressForwardButton(pageNum){
    monsterContainer.innerHTML = ""
    populateMonsters(pageNum + 1)
    body.dataset.pageNumber++
}

function pressBackButton(pageNum) {
    if (pageNum > 1) {
    monsterContainer.innerHTML = ""
    populateMonsters(pageNum-1)
    body.dataset.pageNumber--
    } else {
        alert("You can't do that!")
    }
}

function addCreateButtonToPage(){ 
    const form = document.createElement("form") 
    form.dataset.id = "monster-form"

    form.innerHTML = `
    <input id='name' placeholder="name...">
    <input id="age" placeholder="age...">
    <input id="description" placeholder="description...">
    <button>Create</button>`
    

    name = form.querySelector("#name")
    createButton.appendChild(form)

    form.addEventListener("submit", event => {
        event.preventDefault()
        console.log(event.target.children[0].value)
        let postObj =  configPostObj(event.target.children[0].value, event.target.children[1].value, event.target.children[2].value)

        fetch(MONSTERURL, postObj)
        .then(console.log)
    })
    
}

function configPostObj(name, age, description) {
    return {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            age: parseFloat(age), 
            description: description
        })
    }
}

