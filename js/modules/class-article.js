import { API } from './class-api.js';

export class Article extends API {
  constructor() {
    super();
    this.endpoint = localStorage.selectedArticle;
    this.api_call = this.url + this.endpoint;
    this.currentUser = localStorage.user;
  }

  async createArticlePage() {
    try {
      super.methodGet(this.api_call).then((mockData) => {
        this.fillArticle(mockData);
      });
      super.methodGet(`${this.api_call}/comments`).then((mockData) => {
        mockData.forEach((comment) => {
          this.createCommentList(comment);
        });
      }).then(this.setCurrentUser())
        .then(this.addListeners());
    } catch (err) {
      throw Error(err);
    }
  }

  fillArticle(mock) {
    const articleAuthor = document.querySelector('.article__info :nth-child(1)');
    articleAuthor.innerText = `by ${mock.author.name}`;

    const date = document.querySelector('.article__info :nth-child(2)');
    date.innerText = mock.createdAt;

    const title = document.querySelector('.article__title');
    title.innerText = mock.title;

    const image = document.querySelector('.article_image');
    image.src = mock.image;

    const content = document.querySelector('.article__content');
    content.innerText = mock.content;

    const tags = document.querySelector('.article__tags');
    mock.tags.forEach((tag) => {
      const p = document.createElement('p');
      p.innerText = tag;
      tags.append(p);
    });

    const comments = document.querySelector('.article__actions > p');
    comments.innerText = `Comments: ${mock.comments.length}`;

    const likes = document.querySelector('.likes :nth-child(2)');
    likes.innerText = mock.likes;
  }

  createCommentList(mock) {
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.id = mock.id;

    const header = document.createElement('div');
    header.className = 'comment__header';

    const author = document.createElement('div');
    author.className = 'comment__author';
    const avatar = document.createElement('p');
    avatar.innerHTML = '&#128100';
    const authorName = document.createElement('p');
    authorName.innerHTML = mock.author;
    author.append(avatar, authorName);

    const date = document.createElement('p');
    date.innerHTML = mock.createdAt;

    const deleteCommentBtn = document.createElement('div');
    deleteCommentBtn.className = 'button-delete-comment';
    deleteCommentBtn.innerHTML = '×';

    header.append(author, date, deleteCommentBtn);

    const commentText = document.createElement('p');
    commentText.innerText = mock.commentText;

    const likes = document.createElement('div');
    likes.className = 'likes';
    const icon = document.createElement('p');
    icon.className = 'likes__icon';
    icon.innerHTML = '&#9825';
    const likesNumber = document.createElement('p');
    likesNumber.className = 'likes__number';
    likesNumber.innerText = mock.likes;
    likes.append(icon, likesNumber);

    comment.append(header, commentText, likes);
    document.querySelector('.comment-list').append(comment);
  }

  setCurrentUser() {
    const newCommentAuthor = document.querySelector('.comment__author :nth-child(2)');
    newCommentAuthor.innerText = this.currentUser;
  }

  async likeArticle() {
    const likes = document.querySelector('.likes :nth-child(2)');
    let count = +likes.innerHTML + 1;
    likes.innerHTML = count;
    super.methodPut(this.api_call, { "likes": count });
  }

  async deleteArticle() {
    super.methodDelete(this.api_call).then(() => {
      alert('Post deleted successfully');
      window.location.href = '../index.html';
    });
  }

  async addArticle(data) {
    super.methodPost(`${this.url}/users/1/articles`, data).then(() => {
      alert('New post added successfully.');
      location.href = '../index.html';
    })
  }

  async editArticle(data) {
    super.methodPut(`${this.api_call}`, data).then(() => {
      alert('Post changed successfully.');
      location.href = '../index.html';
    })
  }

  addListeners() {
    this.likeArticle = this.likeArticle.bind(this);
    document.querySelector('.likes :nth-child(1)').addEventListener('click', () => {
      if (!localStorage.user) {
        alert('Please, log in first to like post.');
        return;
      }
      this.likeArticle();
    });

    this.deleteArticle = this.deleteArticle.bind(this);
    document.querySelector('#button-delete-post').addEventListener('click', () => {
      if (!localStorage.user) {
        alert('Please, log in first to delete posts.');
        return;
      }
      this.deleteArticle();
    });

    document.querySelector('#button-edit-post').addEventListener('click', () => {
      if (!localStorage.user) {
        alert('Please, log in first to edit posts.');
        return;
      }
      localStorage.action = 'edit';
      location.href = 'article-form.html';
    });
  }
}