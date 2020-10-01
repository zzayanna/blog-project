import {UserMetods} from './modules/class-article.js';

let currentUser = null;
const userMetods = new UserMetods();
userMetods.loadUser();
userMetods.checkUser();