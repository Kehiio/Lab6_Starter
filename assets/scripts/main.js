// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. Compelte function
	const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. Reference to the <main> element
	const main = document.querySelector('main');

	// A11. Create recipie card for each array element
	recipes.forEach(recipe => {
		const card = document.createElement('recipe-card');
		card.data = recipe;
		main.append(card);
	});
}

// EXPLORE - START (All explore numbers start with B)
/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	
	// B1. Save recipie objects in array to local storage
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. reference to the <form> element
	const form = document.querySelector("#new-recipe");

	// B3. Event listener for the 'submit' event
	const submitButton = document.querySelector('[type="submit"]')
	submitButton.addEventListener("click", (event) =>{
		// B4.Create a new FormData object from the <form> element reference above
		const formData = new FormData(form);

		// B5.  Empty object instance
		const newRecipeObj = {};
		formData.forEach((value, key) => {
			newRecipeObj[key] = value;
		});

		// B6. Create new <recipe-card> element
		const newCard = document.createElement('recipe-card');

		// B7. Add the new object data to <recipe-card> using element.data
		newCard.data = newRecipeObj;

		// B8. Append <recipe-card> to <main>
		const main = document.querySelector('main');
		main.append(newCard);

		// B9. Get the recipes array, add new recipie, save array
		const localRecipes = getRecipesFromStorage();
		localRecipes.push(newRecipeObj);
		saveRecipesToStorage(localRecipes);
	});

	
	// B10. Reference to the "Clear Local Storage" button
	const clearStorageButton = document.querySelector('[class="danger"]');

	// B11. Click event listener for clear local storage button
	clearStorageButton.addEventListener("click", (event) =>{
		// B12. Clears local storage
		localStorage.clear();

		// B13. Repalce the contents of <main>
		let main = document.querySelector('main');
		main.innerHTML = '';

	});


}
