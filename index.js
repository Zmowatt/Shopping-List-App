//----------------------COOK BOOK SECTION----------------------------

//Load all the recipes on into the cookbook section
function loadRecipes(){
    fetch('http://localhost:3000/recipes')
        .then(res => res.json())
        .then((data) => {
            data.forEach((recipe) => renderRecipe(recipe))
        })
}
//Render each recipe
function renderRecipe(recipe){
    const cookBook = document.querySelector("#recipe-list");
    const newRecipe = document.createElement('li');

    newRecipe.className = "meal";
    newRecipe.innerHTML = `
    <div style="display: flex">
        <p>${recipe.meal}</p>
        </br>
        <button class="add-button">Add to Shopping List</button>
        <button class="delete-button">Delete Recipe</button>
    </div>
    `
    cookBook.appendChild(newRecipe);   

    let addButton = newRecipe.querySelector('.add-button')
    addButton.addEventListener('click', () => {
        moveToShopList(recipe.ingredients)
    })

    let deleteButton = newRecipe.querySelector('.delete-button')
    deleteButton.addEventListener('click', () =>{
        newRecipe.remove();
        deleteRecipe(recipe.id)
    })
} 
//Add more ingredient entry options
const ingredientsEntry = document.querySelector('#ingredients-entry');
const moreIngredients = document.querySelector('#more-ingredients');
let i=6;
moreIngredients.addEventListener('click', (e) => {
    e.preventDefault();
    const newEntry = document.createElement('input');
    const newLine = document.createElement('br');
    
    newEntry.type = "text";
    newEntry.id = i;
    newEntry.placeholder = "Ingredient";

    ingredientsEntry.appendChild(newEntry)
    ingredientsEntry.appendChild(newLine)
    i += 1;
});

//Add recipe ingredients to the shopping list

function moveToShopList(ingredients){
    Object.keys(ingredients).forEach(key =>{
            let newItemObj = {item: ingredients[key]};
            console.log(newItemObj);
            postItem(newItemObj);
            addToList(newItemObj);
        })
}

//Add New Recipe
let newRecipeForm = document.querySelector('#new-recipe-form')

const addRecipeButton = document.querySelector('#add-recipe-button')
addRecipeButton.addEventListener('click', addRecipe)

function addRecipe(e){
    e.preventDefault();
    let newIngredientsObj ={}

    let inputs = document.querySelectorAll('#ingredients-entry input[type="text"]')
    inputs.forEach((input) => {
        if(input.value !== ''){
            let inputId = input.id.toString();
            let inputValue = input.value;
            
            newIngredientsObj['item-' + inputId] = inputValue;
        }
        input.value = '';
    })


    let newRecipeObj = {
        meal: document.querySelector('#new-recipe').value,
        ingredients: newIngredientsObj
    }
    console.log(newRecipeObj)
    renderRecipe(newRecipeObj)
    postRecipe(newRecipeObj)
    document.querySelector('#new-recipe').value = '';
    
}

//Post recipe to server
function postRecipe(recipe){
    fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(recipe)
      })
      .then(res => res.json())
      .then((newRecipe) => console.log(newRecipe))
}

//Delete recipe from server
function deleteRecipe(id){
    fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    })

}

//Search for Recipe

const searchButton = document.querySelector("#search-button");

searchButton.addEventListener('click', lookUpRecipe)

function lookUpRecipe(e){
    e.preventDefault();
    const userInput = document.querySelector("#search-input").value; //Moved userInput into the lookUpRecipe function, so that when the event is activated, it will pull the value of the search input.
    fetch('http://localhost:3000/recipes')
        .then(res => res.json())
        .then((data) => {
            const perfectMatch = data.find((recipe) => recipe.meal === userInput) //Used .find() in lieu of .forEach(). .find() iterates through the recipes to find and return the first recipe that matches that userInput.

            if(perfectMatch) { // The result of the .find() was assigned to the perfectMatch variable. If perfectMatch exists, it will console.log the name of the meal and the ingredients.
                console.log(perfectMatch.meal)
                console.log(perfectMatch.ingredients)
            } else {
                console.log("Meal Not Found") //Should no meal be found, the console will log "Meal Not Found"
            }
        })
        
    }

/*PREVIOUS SEACH FOR RECIPE(NON-FUNCTIONING)
const userInput = document.querySelector("#search-input").value;
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener('submit', lookUpRecipe)

function lookUpRecipe(e){
    e.preventDefault();
    fetch('http://localhost:3000/recipes')
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((recipe) => searchName(recipe))
        })
}

function searchName(recipe){
    if(recipe.meal === userInput){    
        console.log(recipe)
    }
}
*/

//---------------SHOPPING LIST SECTION------------------------------------

//Load Shopping List Items
function loadShopList(){
    fetch('http://localhost:3000/shopping-list')
        .then(res => res.json())
        .then((data) => {
            data.forEach((buyMe) => renderShopList(buyMe))
        })
}

//Render Each Shopping List Item from Server
function renderShopList(buyMe){
    const groceryList = document.querySelector("#grocery-list");
    const newItem = document.createElement('li');

    newItem.className = "item";
    newItem.innerHTML = `
    <div style="display: flex">
        <p style="margin-right: 10px; font-size: 14px">${buyMe.item}</p>
        <button class="delete">Delete</button>
    </div>
    `

    let deleteButton = newItem.querySelector('.delete');
    deleteButton.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = 'red';
    });
    deleteButton.addEventListener('mouseout', (event) => {
        event.target.style.backgroundColor = '';
    }); 

    deleteButton.addEventListener('click', () => {
        newItem.remove();
        deleteItem(buyMe.id)
    })

    groceryList.appendChild(newItem);   

}   

//Delete Items from server
function deleteItem(id){
    fetch(`http://localhost:3000/shopping-list/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    })

}

//Add Misc. Items to Shopping List
const addItemButton = document.querySelector('#submit-item')

addItemButton.addEventListener('click', addItem);

//Add to List
function addItem(e){
    e.preventDefault();
    let pickMeUp = document.getElementById('pickMeUp').value;
    if(pickMeUp !== ''){
        let newItemObj = {item: pickMeUp}
        console.log(newItemObj);
        postItem(newItemObj);
        addToList(newItemObj);
    }
}   


function addToList(item){
    const groceryList = document.querySelector('#grocery-list');
    let newIngredient = document.createElement('li');
    newIngredient.innerHTML = `
        <div style="display: flex">
            <p style="margin-right: 10px; font-size: 14px">${item.item}</p>
            <button class="delete" id="delete-item">Delete</button>
        </div>
        `
    groceryList.appendChild(newIngredient);
    item.value ='';  

    let deleteButton = newIngredient.querySelector('#delete-item');
    deleteButton.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = 'red';
    });
    deleteButton.addEventListener('mouseout', (event) => {
        event.target.style.backgroundColor = '';
    }); 
    deleteButton.addEventListener('click', () => {
        newIngredient.remove();
        deleteItem(item.id)
    })
}

//Add Item to the server
function postItem(item){
    fetch('http://localhost:3000/shopping-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(item)
      })
      .then(res => res.json())
      .then((newItem) => console.log(newItem))
}


// ----------------------------------Initialize----------------------------------
loadRecipes()
loadShopList()


//-------------------Experimental---------------------------------
//----Add to shopping list and cook book
// let doBoth = document.querySelector('#do-both');
// doBoth.addEventListener('click', bookAndList);

// function bookAndList(){
//     addRecipe();
//     moveToShopList();
// }
