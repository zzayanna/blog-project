import { API } from './class-api.js';

export class Comment extends API {
  constructor() {
    super();
    this.endpoint = `${this.url}${localStorage.selectedArticle}/comments`;
  }

  async addComment() {
    const author = document.querySelector('.comment__author :nth-child(2)').innerHTML;
    const commentText = document.querySelector('#input-comment').value;
    const date = new Date().toLocaleString();

    const data = {
      "createdAt": date,
      "author": author,
      "commentText": commentText,
      "likes": ''
    }

    super.methodPost(this.endpoint, data).then(() => {
     location.reload();
    });
  }

  async deleteComment () {
    if (event.target.innerText != '×') return;
    let commentSelected = event.target.closest('.comment').id;
    super.methodDelete(`${this.endpoint}/${commentSelected}`).then(() => {
     location.reload();
    });
  }

  async likeComment() {
    if (event.target.className != 'likes__icon') return;

    const likes = event.target.nextElementSibling;
    let count = +likes.innerHTML + 1;
    likes.innerHTML = count;

    let commentSelected = event.target.closest('.comment').id;
    super.methodPut(`${this.endpoint}/${commentSelected}`, { "likes": count });
  }
}