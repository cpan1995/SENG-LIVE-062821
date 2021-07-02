
document.querySelector('#book-form').addEventListener('submit',(e)=> {
  e.preventDefault()
  let newBook = {
    title: e.target.title.value,
    author: e.target.author.value,
    price:e.target.price.value,
    image_url:e.target.image_url.value,
    inventory: 0,
    reviews: []
  }
  renderCard(newBook)
})


//Render ***********
function renderAside(storeObj){
  document.querySelector('.location').textContent = storeObj.name
  document.querySelector('#hours').textContent = storeObj.hours
  document.querySelectorAll('aside ul li')[0].textContent = storeObj.number
  document.querySelectorAll('aside ul li')[1].textContent = storeObj.address

}

function renderCard(book){
  let li = document.createElement('li')
  let h4Title = document.createElement('h4')
  let h4Author = document.createElement('h4')
  let img = document.createElement('img')
  let pPrice = document.createElement('p')
  let pInventory = document.createElement('p')
  let btn = document.createElement('button')
  

  li.className = 'card'
  img.src = book.image_url
  h4Title.textContent = book.title 
  h4Author.textContent = book.author
  pPrice.textContent = `Price: ${book.price}`
  pInventory.textContent = `Inventory: ${book.inventory}`
  btn.textContent = 'Add Inventory'

  btn.addEventListener('click', () => {
    book.inventory+=1
    pInventory.textContent = `Inventory: ${book.inventory}`
  })
  //HomeWork-------------------------------------------------
  //The books has an array of reviews
  //Add the review content to the card. 
  //Bonus
  //Add a form to the card that will render a new review to the card.

  li.append(img, h4Title, h4Author, pPrice, pInventory, btn)
  let counter = 1;
  book.reviews.forEach(element => {
    let eachReview = document.createElement('p');
    eachReview.id = 'reviewChild';
    eachReview.textContent = `Review ${counter}: ${element.content}`
    li.append(eachReview);
    counter +=1;
  })
  
  let formButton = document.createElement('button')
  formButton.textContent = "Add Review"
  formButton.setAttribute('type', 'submit');
  let reviewInput = document.createElement('input');
  reviewInput.setAttribute('type', 'text');
  reviewInput.name = 'reviewText';
  reviewInput.setAttribute('id', "reviewTextBox")
  reviewInput.setAttribute('style', "border:1px solid #ff0000")
  let reviewForm = document.createElement('form');
  reviewForm.id = 'reviewForm';

  reviewForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(e.target.reviewTextBox.value != null){
      book.reviews.push({content: e.target.reviewTextBox.value});
    }
    renderJustTheReviewsInCards(book,e.currentTarget.parentNode);
  })

  reviewForm.append(reviewInput, formButton);
  
  li.appendChild(reviewForm)

  document.querySelector('#book-list').prepend(li)

}

// Render HTML is powerful but can cause issues with 
// Cross-site scripting
// Its safe to use if you're not using external data with it
// In this example it can be d
// function renderHTML(book){
//   let li = document.createElement('li')
//   li.className = 'card'
//   li.innerHTML = `
//     <img src=${book.image_url}>
//     <h4>${book.title}</h4>
//     <h4>${book.author}</h4>
//     <p>Price: ${book.price}</p>
//     <p>Inventory ${book.inventory}</p>
//   `
//   document.querySelector('#book-list').prepend(li)
// }


//Initial Render 
function initialRender(){
  renderAside(bookStore)
  document.querySelector('#book-list li').remove()
  bookStore.inventory.forEach(renderCard)
  // the forEach above and below are doing the same thing
  // the one below has an unnecessary nested callback
  // the above is using renderCard as the callback
  bookStore.inventory.forEach(book => renderCard(book))

}

function renderJustTheReviewsInCards(book, parentElement){
  let counter = 1
  removeAllReviewNodes(parentElement);
  book.reviews.forEach(element => {
    let eachReview = document.createElement('p');
    eachReview.id = 'reviewChild';
    eachReview.textContent = `Review ${counter}: ${element.content}`
    parentElement.append(eachReview);
    counter +=1;
  })
}

function removeAllReviewNodes(parentElement){
  console.log(parentElement.querySelectorAll('#reviewChild'))
  if(parentElement.querySelectorAll('#reviewChild')!=null){
    parentElement.querySelectorAll('#reviewChild').forEach(element => {
      element.remove();
    })
  }
  
}
initialRender()
