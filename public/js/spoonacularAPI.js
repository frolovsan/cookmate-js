async function fillRecipes() {
  try {
    const response = await fetch(
      'https://api.spoonacular.com/recipes/random?number=9&apiKey=1801c731c8bc40cdb5eac4b302e0343c'
    );
    const result = await response.json();
    for (let i = 0; i < result.recipes.length; i += 1) {
      const { title, image, instructions, cuisines } = result.recipes[i];
      const recipesDiv = document.querySelector('.recipe-container');
      const recipe = document.createElement('div');
      recipe.classList.add('recipe');
      const recTitle = `<h3>${title}</h3>`;
      const recInstr = `<p>${instructions}</p>`;
      const img = `<img src="${image}" alt="recipe" className="img-recipe" />`;
      const ul = document.createElement('ul');
      cuisines.forEach((item) => {
        const li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
      });
      recipe.innerHTML = img;
      recipe.innerHTML += recTitle;
      recipe.appendChild(ul);
      recipe.innerHTML += recInstr;

      recipesDiv.appendChild(recipe);
    }
    console.log(result.recipes);
  } catch (error) {
    console.log(error);
  }
}

fillRecipes();


