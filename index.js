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
    <div>
        <p>${recipe.meal}</p>
        <button class="add-button">Add to Shopping List</button>
        <button class="delete-button">Delete Recipe</button>
    </div>
    `
    cookBook.appendChild(newRecipe);   
} 

//Add more ingredient entry options
const ingredientsEntry = document.querySelector('#ingredients-entry');
const moreIngredients = document.querySelector('#more-ingredients');

moreIngredients.addEventListener('click', (e) => {
    e.preventDefault();
    const newEntry = document.createElement('input');
    const newLine = document.createElement('br');
    
    newEntry.type = "text"
    newEntry.placeholder = "Ingredient"

    ingredientsEntry.appendChild(newEntry)
    ingredientsEntry.appendChild(newLine)
});


//Load Shopping List Items
function loadShopList(){
    fetch('http://localhost:3000/shopping-list')
        .then(res => res.json())
        .then((data) => {
            data.forEach((buyMe) => renderShopList(buyMe))
        })
}

function renderShopList(buyMe){
    const groceryList = document.querySelector("#grocery-list");
    const newItem = document.createElement('li');

    newItem.className = "item";
    newItem.innerHTML = `
    <div style="display: flex">
        <p style="margin-right: 10px">${buyMe.item}</p>
        <button class="delete-button" style="font-size: 14px; padding-top: -4px">Delete</button>
    </div>
    `
    groceryList.appendChild(newItem);   
}


//------------------------------------------------------------------
//Add Misc. Items to Shopping List
addItemButton = document.querySelector('#submit-item')

addItemButton.addEventListener('submit', (e) => {
    e.preventDefault();
    const groceryList = document.querySelector('#grocery-list')
    const newItemInput = document.querySelector('input[name="item"]');
    newItemText = newItemInput.value;

    // let newIngredient = document.createElement('li'),
    // newIngredient.textContent = newItemText;
    // groceryList.appendChild(newItem);
    // newItemInput.value ='';  
});


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