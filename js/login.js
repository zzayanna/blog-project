import {UserMetods} from './modules/login-module.js';

let currentUser = null;
const userMetods =  new UserMetods();
userMetods.loadUser();
userMetods.checkUser();

class UserApi {
  async checkForm() {
    try {
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      const endpoint = await fetch(`https://5f573cb632f56200168bdfe8.mockapi.io/users?name=${username.value}`);
      const userResponse = await endpoint.json();
      const userData = userResponse[0];
      if(userData.password == password.value) {
        currentUser = `${userData.name}`;
        localStorage.setItem('user', `${currentUser}`);
        userMetods.loadUser();
        userMetods.checkUser();
        username.style.borderColor = 'rgb(82, 66, 109);';
        password.style.borderColor = 'rgb(82, 66, 109);';
      } else {
        username.style.borderColor = '#bd0802';
        password.style.borderColor = '#bd0802';
      }
        return currentUser
         
    } catch (err) {
      username.style.borderColor = 'darkred';
      password.style.borderColor = 'darkred';
      throw Error(err);
    }
  }
  submit () {
    const buttonLogin = document.getElementById('button-login');
    buttonLogin.onclick = userApi.checkForm;
    userMetods.checkUser();  
  }
}

const userApi = new UserApi();
userApi.submit();
