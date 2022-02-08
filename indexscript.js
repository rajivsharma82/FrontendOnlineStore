const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);

const user = urlParams.get('userid')
let welcomeMessage = document.getElementById('welcome');
if(user!= null)
 welcomeMessage.innerHTML= "Hello " + user;