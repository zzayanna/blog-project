import { Article } from './modules/class-article.js';
import { UserMetods } from './modules/login-module.js';

let currentUser = null;
const userMetods = new UserMetods();
userMetods.loadUser();
userMetods.checkUser();

const article = new Article();
if (localStorage.action === 'add') {
  article.addArticle = article.addArticle.bind(article);
  document.querySelector('form').addEventListener('submit', () => {
    const data = getFieldsValues();
    article.addArticle(data);
  });
} else {
  document.querySelector('.form-article h1').innerHTML = 'Edit post';
  article.methodGet(article.api_call).then((data) => {
    document.getElementById('title').value = data.title;
    document.getElementById('input-article-content').value = data.content;
    document.getElementById('imageUrl').value = data.image;
    const selectedCheckboxes = document.querySelectorAll('.form-article__tags input');
    selectedCheckboxes.forEach((checkbox) => {
      if (data.tags.includes(checkbox.value)) {
        checkbox.checked = 1;
      }
    })
  });
  article.editArticle = article.editArticle.bind(article);
  document.querySelector('form').addEventListener('submit', () => {
    const data = getFieldsValues();
    article.editArticle(data);
  });
}

function getFieldsValues () {
  const title = document.getElementById('title').value;
  const content = document.getElementById('input-article-content').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const date = new Date();
  const selectedCheckboxes = document.querySelectorAll('.form-article__tags input:checked');
  const checkedValues = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);

  const data = {
    "createdAt": date,
    "author": localStorage.currentUser,
    "title": title,
    "content": content,
    "image": imageUrl,
    "tags": checkedValues,
    "likes": ""
  }
  return data;
}
