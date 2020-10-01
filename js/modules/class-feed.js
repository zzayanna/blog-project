import { API } from './class-api.js';

export class Feed extends API {
  constructor() {
    super();
  }

  async createFeed() {
    super.methodGet(`${this.url}/users`).then((users) => {
      users.forEach((user) => {
        let endpoint = `${this.url}/users/${user.id}/articles`;
        super.methodGet(endpoint).then((articles) => {
          articles.forEach((article) => {
            this.createArticleSnippet(article);
          });
        });
      });
    });
  }

  createArticleSnippet(mock) {
    const article = document.createElement('article');
    article.className = 'article-snippet';
    article.id = `/users/${mock.userId}/articles/${mock.id}`;

    const articleImage = document.createElement('div');
    articleImage.className = 'article-snippet__image';
    const image = document.createElement('img');
    image.src = mock.image;
    articleImage.append(image);

    const articleContent = document.createElement('div');
    articleContent.className = 'article-snippet__content';

    const articleInfo = document.createElement('div');
    articleInfo.className = 'article-snippet__info';
    const author = document.createElement('p');
    author.innerHTML = `by <span>${mock.author.name}</span>`;
    const date = document.createElement('p');
    date.innerText = mock.createdAt;
    articleInfo.append(author, date);

    const title = document.createElement('h2');
    title.className = 'article-snippet__title';
    title.innerText = mock.title;

    const text = document.createElement('p');
    text.className = 'article-snippet__text';
    text.innerText = mock.content;

    const actions = document.createElement('div');
    actions.className = 'article-snippet__actions';
    const likes = document.createElement('p');
    likes.innerText = `Likes: ${mock.likes}`;
    const comments = document.createElement('p');
    comments.innerText = `Comments: ${mock.comments.length}`;
    const moreButton = document.createElement('p');
    moreButton.className = 'button-read-more';
    const link = document.createElement('a');
    link.href = 'pages/article.html';
    link.innerText = 'Read more';
    moreButton.append(link);
    actions.append(likes, comments, moreButton);

    articleContent.append(articleInfo, title, text, actions);
    article.append(articleImage, articleContent);
    const articleList = document.querySelector('.articles-list');
    articleList.append(article);

    articleList.addEventListener('click', (event) => {
      if (event.target.innerText != 'Read more') return;

      let articleSnippet = event.target.closest('.article-snippet');
      localStorage.selectedArticle = articleSnippet.id;
    });
  }
}