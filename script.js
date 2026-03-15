// CART STORAGE

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let buttons = document.querySelectorAll(".product button");
let cartCount = document.getElementById("cart-count");

updateCartCount();

buttons.forEach(function(button,index){

button.addEventListener("click",function(){

let product = document.querySelectorAll(".product")[index];

let name = product.querySelector("h3").textContent;
let price = product.querySelector("p").textContent;
let img = product.querySelector("img").src;

cart.push({name,price,img});

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

button.classList.add("added");

showToast();

setTimeout(()=>{
button.classList.remove("added");
},800);

});

});

function updateCartCount(){

if(cartCount){
cartCount.textContent = cart.length;
}

}

// CART PAGE

let cartItems = document.getElementById("cart-items");

if(cartItems){

if(cart.length === 0){

cartItems.innerHTML = "<p>Your cart is empty</p>";

}else{

cartItems.innerHTML = "";

cart.forEach(function(item,index){

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.img}" width="80">

<h3>${item.name}</h3>

<p>${item.price}</p>

<button onclick="removeItem(${index})">Remove</button>

</div>

`;

});

}

}

// REMOVE ITEM

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

// TOTAL PRICE

let totalDiv = document.getElementById("cart-total");

if(totalDiv){

let total = 0;

cart.forEach(function(item){

total += parseInt(item.price.replace("$",""));

});

totalDiv.innerHTML = "<h2>Total: $" + total + "</h2>";

}

// CLEAR CART

let clearBtn = document.getElementById("clear-cart");

if(clearBtn){

clearBtn.onclick = function(){

localStorage.removeItem("cart");

location.reload();

};

}

// CHECKOUT BUTTON

let checkoutBtn = document.getElementById("checkout");

if(checkoutBtn){

checkoutBtn.onclick = function(){

alert("Thank you for shopping with SneakerHub 👟");

localStorage.removeItem("cart");

location.reload();

};

}

// SEARCH

let search = document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

let value = this.value.toLowerCase();

let products = document.querySelectorAll(".product");

products.forEach(function(product){

let name = product.querySelector("h3").textContent.toLowerCase();

if(name.includes(value)){
product.style.display = "block";
}else{
product.style.display = "none";
}

});

});

}

// FILTER PRODUCTS

function filterProducts(category){

let products = document.querySelectorAll(".product");

products.forEach(function(product){

if(category === "all"){
product.style.display = "block";
}
else if(product.classList.contains(category)){
product.style.display = "block";
}
else{
product.style.display = "none";
}

});

}

// THEME TOGGLE

let toggle = document.getElementById("theme-toggle");

if(toggle){

toggle.addEventListener("click",function(){

document.body.classList.toggle("light-mode");

});

}

// LOADER

window.addEventListener("load",function(){

let loader = document.getElementById("loader");

if(loader){
loader.style.display = "none";
}

});

// IMAGE MODAL ZOOM

let modal = document.getElementById("image-modal");
let modalImg = document.getElementById("modal-img");
let closeBtn = document.querySelector(".close");

let productImages = document.querySelectorAll(".product img");

productImages.forEach(function(img){

img.addEventListener("click", function(){

if(modal && modalImg){
modal.style.display = "flex";
modalImg.src = this.src;
}

});

});

if(closeBtn){
closeBtn.onclick = function(){
modal.style.display = "none";
};
}

if(modal){
modal.onclick = function(){
modal.style.display = "none";
};
}

// TOAST MESSAGE

function showToast(){

let toast = document.getElementById("toast");

if(toast){

toast.classList.add("show");

setTimeout(()=>{
toast.classList.remove("show");
},2000);

}

}

// PARTICLES BACKGROUND

const canvas = document.getElementById("particles");

if(canvas){

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<60;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*3,
speedX:(Math.random()-0.5),
speedY:(Math.random()-0.5)
});

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

ctx.fillStyle="rgba(255,255,255,0.5)";
ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();

p.x+=p.speedX;
p.y+=p.speedY;

if(p.x<0||p.x>canvas.width) p.speedX*=-1;
if(p.y<0||p.y>canvas.height) p.speedY*=-1;

});

requestAnimationFrame(animateParticles);

}

animateParticles();

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

}
