let addToy = false;

function patchFunction(e) {
  let elementID = e.target.id
  let elementLikesString = document.getElementById(elementID).parentNode.querySelector("p").textContent.split(" ")[0];
  let elementLikesNumber = parseInt(elementLikesString, 10)+1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json",
    },
    body: JSON.stringify({
      "likes": `${elementLikesNumber}`
    }) 
  })
  .then((resp) => resp.json())
  .then((data) => {
    document.getElementById(elementID).parentNode.querySelector("p").textContent = `${elementLikesNumber} likes`
  })
}

function createCard(cards) {
  for (card in cards) {

    let newDiv = document.createElement("div")
    newDiv.className = "card"
    let newHeader = document.createElement("h2")
    newHeader.textContent = cards[card].name
    newDiv.appendChild(newHeader)
    let newImage = document.createElement("img")
    newImage.setAttribute("src", cards[card].image)
    newImage.className = "toy-avatar"
    newDiv.appendChild(newImage)
    let newParagraph = document.createElement("p")
    newParagraph.textContent = `${cards[card].likes} likes`
    newDiv.appendChild(newParagraph)
    let newButton = document.createElement("button")
    newButton.className = "like-btn"
    newButton.id = `${cards[card].id}`
    newButton.textContent = "like"
    newButton.addEventListener("click", patchFunction)
    newDiv.appendChild(newButton)
    document.getElementById("toy-collection").appendChild(newDiv)
  }
}

function createOneCard(card) {
  let newDiv = document.createElement("div")
    newDiv.className = "card"
    let newHeader = document.createElement("h2")
    newHeader.textContent = card.name
    newDiv.appendChild(newHeader)
    let newImage = document.createElement("img")
    newImage.setAttribute("src", card.image)
    newImage.className = "toy-avatar"
    newDiv.appendChild(newImage)
    let newParagraph = document.createElement("p")
    newParagraph.textContent = `${card.likes} likes`
    newDiv.appendChild(newParagraph)
    let newButton = document.createElement("button")
    newButton.className = "like-btn"
    newButton.id = `${card.id}`
    newButton.textContent = "like"
    newButton.addEventListener("click", patchFunction)
    newDiv.appendChild(newButton)
    document.getElementById("toy-collection").appendChild(newDiv)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then((resp) => resp.json())
  .then((data) => createCard(data))

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    let userInput = {
      "name" : `${document.querySelectorAll("input")[0].value}`,
      "image" : `${document.querySelectorAll("input")[1].value}`,
      "likes" : 0,
    }
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json",
      },
      body: JSON.stringify(userInput)})
    .then((resp) => resp.json())
    .then((data) => createOneCard(data))
  })
});

