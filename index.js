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
    let cookBook = document.querySelector("#recipe-list");
    let newRecipe = document.createElement('li');

    newRecipe.className = "meal";
    newRecipe.innerHTML = `
    <div>
        <p>${recipe.meal}</p>
        <button class="add-button">Add to Shopping List</button>
        <button class="delete-button">Delete Recipe</button>
    </div>
    `
    cookBook.appendChild(newRecipe);

    let addButton = newRecipe.querySelector('.add-button');
    addButton.addEventListener('click', addIngredients);

    let deleteButton = newRecipe.querySelector('.delete-button');
    deleteButton = newRecipe.addEventListener('click', deleteMeal)
}


//Initialize
loadRecipes()