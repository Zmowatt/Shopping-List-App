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

function moveToShopList(allIngredients){
    allIngredients.forEach(ingredient => {
        Object.keys(ingredient).forEach(key =>{
            let newItemObj = {item: ingredient[key]};
            console.log(newItemObj);
            postItem(newItemObj);
            addToList(newItemObj);
        })
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
            
            // newIngredientsObj.push(ingredientObj)

            // Object.assign(newIngredientsObj, ingredientObj)    
        }
    })


    let newRecipeObj = {
        meal: document.querySelector('#new-recipe').value,
        ingredients: newIngredientsObj
    }
    console.log(newRecipeObj)
    renderRecipe(newRecipeObj)
    postRecipe(newRecipeObj)
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
    deleteButton.addEventListener('click', deleteItem);

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
addItemButton = document.querySelector('#submit-item')

addItemButton.addEventListener('click', addItem);

//Add to List
function addItem(e){
    e.preventDefault();
    let newItemObj = {item: document.getElementById('pickMeUp').value}
    console.log(newItemObj);
    postItem(newItemObj);
    addToList(newItemObj);
}


function addToList(item){
    const groceryList = document.querySelector('#grocery-list');
    let newIngredient = document.createElement('li');
    newIngredient.innerHTML = `
        <div style="display: flex">
            <p style="margin-right: 10px; font-size: 14px">${item.item}</p>
            <button class="delete" id="delete-item" style="border-radius: 50%; padding: 6px 10px">Delete</button>
        </div>
        `
    groceryList.appendChild(newIngredient);
    item.value ='';  

    let deleteButton = newIngredient.querySelector('#delete-item');
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


// ---------------------------------------------------------------------------
// let addButton = newRecipe.querySelector('.add-button');
// addButton.addEventListener('click', addIngredients);

// let deleteButton = newRecipe.querySelector('.delete-button');
// deleteButton = newRecipe.addEventListener('click', deleteMeal)

// function addIngredients(recipe){
//     let ingredient = document.createElement('li');
//     ingredient.innerText  = `${recipe.ingredients}`

//     let groceryList = document.querySelector('#grocery-list')

//     groceryList.appendChild(ingredient);

// }

//Initialize
loadRecipes()
loadShopList()