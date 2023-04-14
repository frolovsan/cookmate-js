const recDiv = document.querySelector('.recipe-container');
const recipeBtn = document.querySelector('.recipeBtn');
const oneRecipe = document.querySelectorAll('.oneRecipe');
const themeBtn = document.querySelector('.themeBtn');

recipeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/new';
});

themeBtn.addEventListener('click', () => {
  const themeDiv = document.createElement('div');
  themeDiv.classList.add('themeDiv');

  const themeForm = document.createElement('form');
  themeForm.classList.add('themeForm');
  themeForm.name = 'themeForm';

  const themeInput = document.createElement('input');
  themeInput.classList.add('themeInput');
  themeInput.placeholder = 'Введите тему оформления';
  themeInput.type = 'text';
  themeInput.name = 'theme';

  const changeThemeBtn = document.createElement('button');
  changeThemeBtn.classList.add('changeThemeBtn');
  changeThemeBtn.type = 'submit';
  changeThemeBtn.textContent = 'Изменить!';

  themeForm.append(themeInput, changeThemeBtn);
  themeDiv.appendChild(themeForm);
  recDiv.appendChild(themeDiv);

  themeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(themeForm.theme.value);
    try {
      const theme = {
        theme: themeForm.theme.value,
      };
      console.log(theme);
      const response = await fetch('/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theme),
      });
      const result = await response.json();
      document.documentElement.style.setProperty(
        '--my-color',
        `#${result.data}`
      );
      themeDiv.remove();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  });
});

recDiv.addEventListener('click', async (e) => {
  console.log('Нажали на кнопку');
  try {
    if (e.target.classList.contains('delBtn')) {
      const response = await fetch(`/${e.target.id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.ok) {
        e.target.parentNode.remove();
        console.log('Рецепт удален!');
      } else {
        console.log('Рецепт не удален :(');
      }
    }
  } catch (error) {
    console.log(error);
  }
  try {
    if (e.target.classList.contains('editBtn')) {
      console.log(e.target);
      const recCard = e.target.parentNode;

      const btnDiv = document.createElement('div');
      btnDiv.classList.add('btnDiv');

      const saveBtn = document.createElement('button');
      saveBtn.classList.add('saveBtn');
      saveBtn.type = 'submit';
      saveBtn.textContent = 'Сохранить';
      saveBtn.id = e.target.id;

      const cancelBtn = document.createElement('button');
      cancelBtn.classList.add('cancelBtn');
      cancelBtn.type = 'button';
      cancelBtn.textContent = 'Отменить';
      cancelBtn.id = e.target.id;

      const editDiv = document.createElement('div');
      editDiv.classList.add('editDiv');

      const editForm = document.createElement('form');
      editForm.classList.add('editForm');
      editForm.name = 'changeForm';
      editForm.id = saveBtn.id;

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'name';
      nameInput.value = recCard.children[0].textContent;
      nameInput.classList.add('nameInput');

      const descInput = document.createElement('textarea');
      descInput.type = 'text';
      descInput.value = recCard.children[2].textContent;
      descInput.name = 'description';
      descInput.classList.add('descInput');

      btnDiv.append(saveBtn, cancelBtn);
      editForm.append(nameInput, descInput, btnDiv);
      editDiv.appendChild(editForm);
      recDiv.appendChild(editDiv);

      editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('RABOTAEM');
        const obj = {
          name: editForm.name.value,
          description: editForm.description.value,
        };
        try {
          await fetch(`/edit/${event.target.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
          });
          recCard.children[0].innerText = obj.name;
          recCard.children[2].innerText = obj.description;
          editDiv.remove();
        } catch (error) {
          console.log(error);
        }
      });

      cancelBtn.addEventListener('click', () => {
        editDiv.remove();
      });
    }
  } catch (error) {
    console.log(error);
  }
});

oneRecipe.forEach((el) => {
  el.addEventListener('click', (e) => {
    const recCard = e.target.parentNode;

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('closeBtn');
    closeBtn.type = 'button';
    closeBtn.textContent = 'Закрыть';
    closeBtn.id = e.target.id;

    const oneRecDiv = document.createElement('div');
    oneRecDiv.classList.add('oneRecDiv');

    const recTitle = document.createElement('h1');
    recTitle.classList.add('recTitle');
    recTitle.textContent = recCard.children[0].textContent;

    const recImg = document.createElement('img');
    recImg.classList.add('recImg');
    recImg.src = recCard.children[1].src;

    const recDescr = document.createElement('p');
    recDescr.textContent = recCard.children[2].textContent;
    recDescr.classList.add('recDescr');

    oneRecDiv.append(recTitle, recImg, recDescr, closeBtn);
    recDiv.appendChild(oneRecDiv);

    closeBtn.addEventListener('click', () => {
      oneRecDiv.remove();
    });
  });
});
