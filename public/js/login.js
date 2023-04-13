const { loginForm } = document.forms;

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const obj = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    const result = await response.json();
    const msg = document.querySelector('.msg');
    console.log(result.msg);
    if (result.msg === 'Успешно вошли в систему!') {
      setTimeout(() => {
        window.location = '/';
      }, 1000);
    } else if (result.msg === 'Неверный пароль!') {
      msg.style.visibility = 'visible';
      msg.innerText = `${result.msg}`;
      document.querySelectorAll('input').forEach((el) => (el.value = ''));
    } else if (result.msg === 'Такой юзер не найден, зарегистрируйтесь') {
      msg.style.visibility = 'visible';
      msg.innerText = `${result.msg}`;
      setTimeout(() => {
        window.location = '/auth/register';
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
});
