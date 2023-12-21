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

})

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