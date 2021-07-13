const sform = document.getElementById('signup')
sform.addEventListener('submit', registerUser)

async function registerUser(event){
 event.preventDefault()
 const username= document.getElementById('suser').value
const email= document.getElementById('semail').value
const password= document.getElementById('spass').value

const result= await fetch('/api/register',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username,
    email,password
  })
}).then((res)=> res.json())

if(result.status ==='OK'){
 alert('Success')
}else{
  alert(result.error)
}

console.log(result)
}

const form = document.getElementById('login')
form.addEventListener('submit', loginuser)

async function loginuser(event){
 event.preventDefault()
 const username= document.getElementById('luser').value
const password= document.getElementById('lpass').value

const result= await fetch('/api/login',{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username,
    password
  })
}).then((res)=> res.json())

if(result.status ==='OK'){
  console.log('Got the token:', result.data)
  window.location.replace('../home.html')
}else{
  alert(result.error)
}
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

