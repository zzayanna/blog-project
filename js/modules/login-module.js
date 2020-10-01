export class UserMetods {
  checkUser(){
    if(currentUser){
      const logOut = document.getElementById('headButtonLogin')
      logOut.innerHTML = 'LOG OUT';
      logOut.href = '';
      const succesLogin = document.getElementById('loginWrite')
      if(succesLogin){
      succesLogin.innerHTML = `You succesfully log in as: ${currentUser}`
      succesLogin.style.fontStyle = 'italic';
      }
      logOut.addEventListener('click', function () {
        localStorage.removeItem('user');
      })
    }
  }
  loadUser(){
   const localUser = localStorage.getItem('user') 
    if(localUser) {
      currentUser = localUser;  
      return currentUser;
    }
  }
}
let currentUser = null;
const userMetods = new UserMetods();
userMetods.loadUser();
userMetods.checkUser();