import { Comment } from './modules/class-comment.js';

const publishBtn = document.querySelector('input[type="submit"]');
publishBtn.addEventListener('click', () => {
  if (!localStorage.user) {
    alert('Please, log in first to comment post.');
    return;
  }
  const newComment = new Comment();
  newComment.addComment();
});

const commentList = document.querySelector('.comment-list');
commentList.addEventListener('click', () => {
  if (!localStorage.user) {
    alert('Please, log in first.');
    return;
  }
  const comment = new Comment();
  comment.deleteComment();
});

commentList.addEventListener('click', () => {
  if (!localStorage.user) {
    alert('Please, log in first.');
    return;
  }
  const comment = new Comment();
  comment.likeComment();
});
