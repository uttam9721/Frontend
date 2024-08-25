// Search method 

const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');


// function to get recipe



// const fetchRecipes = async (query)=>{
//     const data = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const response= await data.json();
//     console.log(response.meals[0]);

// }
// searchBtn.addEventListener('click',(e)=>{
//     // it help to stop auto refresh
//     e.preventDefault();
//     const searchInput = searchBox.value.trim();
//     fetchRecipes(searchInput);
//     // console.log('Button clicked');
// });


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML=" <h2> Feching Recipes...... </h2> ";
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Clear previous results
        recipeContainer.innerHTML = ''; 
        
        data.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p> <span> ${meal.strArea}</span> Dish</p>
                <p> Belongs to <span> ${meal.strCategory}</span> Category</p>
            `;
            const button = document.createElement('button');
            button.textContent = "View Recipe"; 
            recipeDiv.appendChild(button);

            // Adding addEventListener
            button.addEventListener("click",()=>{
                openRecipePopup(meal)
            })

            recipeContainer.appendChild(recipeDiv);
        });
const fetchIngredients = (meal)=>{
        // console.log(meal)
        let ingredientsList="";
        for(let i=1;i<=20;i++){
            const ingredient = meal[`strIngredient${i}`];
            if(ingredient){
                const measure=meal[`strMeasure${i}`];
                ingredientsList +=`<li>${measure}${ingredient}</li>`
            }
            else{
                break;
            }
        }
        return ingredientsList;
}
const openRecipePopup =(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>   
        <div>
    <h3 class="recipeInstructions">Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `

recipeDetailsContent.parentElement.style.display="block";
}


    } catch (error) {
        console.error('Failed to fetch recipes:', error);
    }
};


recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})

searchBtn.addEventListener('click', (e) => {
    // Prevents the default form submission behavior
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
