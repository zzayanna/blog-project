import {UserMetods} from './modules/login-module.js';

let currentUser = null;
const userMetods = new UserMetods();
userMetods.loadUser();
userMetods.checkUser();


  document.querySelector('.add-post').addEventListener('click', () => {
    if (!localStorage.user) {
      alert('Please, log in first to create a new post.');
      return;
    }
    localStorage.action = 'add';
    location.href = 'pages/article-form.html';
  });
