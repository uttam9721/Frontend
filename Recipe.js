// Search method 

const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');


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
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
    }
};

searchBtn.addEventListener('click', (e) => {
    // Prevents the default form submission behavior
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
});
