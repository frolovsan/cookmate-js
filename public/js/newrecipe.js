const { newRecForm } = document.forms;
newRecForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(newRecForm);
  const response = await fetch('/new/add', {
    method: 'POST',
    body: data,
  });
  const result = await response.json();
  const msg = document.querySelector('.msg');
  if (result.msg) {
    msg.style.visibility = 'visible';
    msg.innerText = `${result.msg}`;
    document.querySelectorAll('input').forEach((el) => (el.value = ''));
    if (result.msg === 'Рецепт добавлен!') {
      setTimeout(() => {
        window.location = '/';
      }, 1000);
    }
  } else {
    msg.style.visibility = 'hidden';
    msg.innerText = '';
    document.querySelectorAll('input').forEach((el) => (el.value = ''));
  }
});
