const delBtn = document.querySelector('.delBtn');

const recipeBtn = document.querySelector('.recipeBtn');

recipeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/new';
});

delBtn.addEventListener('click', async (e) => {
  try {
    const response = await fetch(`/${e.target.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      delBtn.parentNode.parentNode.remove();
      console.log('Рецепт удален!');
    } else {
      console.log('Рецепт не удален :(');
    }
  } catch (error) {
    console.log(error);
  }
});
