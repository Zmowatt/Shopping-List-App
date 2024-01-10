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

//Add recipe ingredients to the shopping list

function moveToShopList(ingredients){
    ingredients.forEach(allIngredients => {
        Object.values(allIngredients).forEach(ingredient =>{
            const groceryList = document.querySelector('#grocery-list');
            let newItem= document.createElement('li');
            newItem.innerHTML = `
                <div style="display: flex">
                    <p style="margin-right: 10px; font-size: 14px">${ingredient}</p>
                    <button id="delete-item" style="border-radius: 50%; padding: 6px 10px">Delete</button>
                </div>
                `
            groceryList.appendChild(newItem);

            let deleteButton = newItem.querySelector('#delete-item');
            deleteButton.addEventListener('click', () => {
                newItem.remove();
                deleteItem(item.id)
            })
    })
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
        <button class="delete-button" style="font-size: 12px; padding: 6px 10px">Delete</button>
    </div>
    `

    let deleteButton = newItem.querySelector('.delete-button');
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
            <button id="delete-item" style="border-radius: 50%; padding: 6px 10px">Delete</button>
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