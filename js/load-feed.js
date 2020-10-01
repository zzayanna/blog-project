import {UserMetods} from './modules/login-module.js';

let currentUser = null;
const userMetods = new UserMetods();
userMetods.loadUser();
userMetods.checkUser();

import { Feed } from './modules/class-feed.js';

const feed = new Feed();
feed.createFeed();