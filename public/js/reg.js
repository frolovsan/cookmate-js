const { registerForm } = document.forms;

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const obj = {
    name: registerForm.name.value,
    email: registerForm.email.value,
    password: registerForm.password.value,
  };
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  const result = await response.json();
  const msg = document.querySelector('.msg');
  if (result.msg) {
    msg.style.visibility = 'visible';
    msg.innerText = `${result.msg}`;
    document.querySelectorAll('input').forEach((el) => (el.value = ''));
    if (result.msg === 'Пользователь зарегистрирован') {
      setTimeout(() => {
        window.location = '/auth/login';
      }, 1000);
    }
  } else {
    msg.style.visibility = 'hidden';
    msg.innerText = '';
    document.querySelectorAll('input').forEach((el) => (el.value = ''));
  }
});
