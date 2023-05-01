import { menuArray } from "./data.js"


const menuItemsEl = document.getElementById("menu-items-element")
const checkoutEl = document.getElementById("checkout-element")
const cvvInput = document.getElementById("cvv-input")
const cardNumberInput = document.getElementById("card-number-input")
const modalForm = document.getElementById("modal-form-el")
const reviewModal = document.getElementById("review-modal-element")
const stars = document.querySelectorAll('.fa-star')

let orderedItems = []


document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        handleAddBtnClick(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handleRemoveBtnClick(e.target.dataset.remove)
    }else if(e.target.dataset.increment){
        handleIncrementBtnClick(e.target.dataset.increment)
    }else if(e.target.dataset.decrement){
        handleDecrementBtnClick(e.target.dataset.decrement)
    }else if(e.target.id === "purchase-btn"){
        handlePurchaseBtnClick()
    }else if(e.target.  id === "star-element"){
      reviewModal.classList.add('hidden')
    }
})


function renderMenu(){
    let menuHtml = ''

    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-item">

            <div class="menu-item-emoji">
                ${item.emoji}
            </div>

            <div class="menu-item-info">
                <h2 class="menu-item-name margin-bottom">${item.name}</h2>
                <p class="menu-item-ingredients margin-bottom">${getItemIngredients(item)}</p>
                <p class="price-tag margin-bottom">$${item.price}</p>
            </div>

            <div class="menu-add-btn margin-left-auto" data-add = ${item.id}>
                <div class="icon" data-add = ${item.id}>+</div>
            </div>

        </div>
        `
    })
    menuItemsEl.innerHTML = menuHtml
}

function getItemIngredients(item){
    let ingredientsStr = ''

    item.ingredients.forEach(function(ingredient ,index){

        let comma = ","
        if(index === item.ingredients.length - 1){
            comma = ""
        }
        ingredientsStr += ingredient + comma
    })
    return ingredientsStr
}

renderMenu()




function renderOrderedItems(){
    let itemHtml = ""
    if(orderedItems.length){
        checkoutEl.classList.remove('hidden')
        orderedItems.forEach(function(item){
            itemHtml += `
            <div class="checkout-item">

                <h2  class="checkout-item-name" id="${item.id}">${item.name}</h2>

                <p class="remove-btn" data-remove=${item.id}>remove</p>
                <div class="small-btn margin-left-auto" data-increment= ${item.id}>
                    <div class="icon" data-increment = ${item.id}>+</div>
                </div>
                <h2>
                    ${item.quantityInCart}
                </h2>
                <div class="small-btn" data-decrement = ${item.id}>
                    <div class="icon" data-decrement = ${item.id}>-</div>
                </div>

                <p class="price-tag checkout-item-price">$${item.price}</p>

            </div>
            `
        })
        document.getElementById('checkout-items-element').innerHTML = itemHtml
    }else {
        checkoutEl.classList.add('hidden')
    }
}

function handleAddBtnClick(itemId){
    
    const targetItem = getTargetItem(itemId)

    if(!orderedItems.includes(targetItem)){
        targetItem.quantityInCart++
        orderedItems.push(targetItem)
        renderOrderedItems()
        updateTotalPrice()
    }
}

function handleRemoveBtnClick(removeId){
    const targetItem = getTargetItem(removeId)
    removeOrderedItem(removeId)
    targetItem.quantityInCart = 0
    updateTotalPrice()
    renderOrderedItems()
}

function handleIncrementBtnClick(incrementId){
    const targetItem = getTargetItem(incrementId)
    targetItem.quantityInCart++
    renderOrderedItems()
    updateTotalPrice()
}

function handleDecrementBtnClick(decrementId){
    const targetItem = getTargetItem(decrementId)
    if(targetItem.quantityInCart > 1){
        targetItem.quantityInCart--
    }else{
        removeOrderedItem(decrementId)
        targetItem.quantityInCart--
    }
    renderOrderedItems()
    updateTotalPrice()
}

function removeOrderedItem(itemId){
    orderedItems = orderedItems.filter(function(item){
        return item.id !== Number(itemId)
    })
}
 
function updateTotalPrice(){
    let sum = 0
    orderedItems.forEach(function(item){
        sum += item.price * item.quantityInCart
    })
    document.getElementById("total-price").textContent = "$"+ sum
}
 

function getTargetItem(itemId){
    const targetItem = menuArray.filter(function(item){
        return item.id === Number(itemId)
    })[0]

    return targetItem
}


function handlePurchaseBtnClick(){
    document.getElementById("info-modal").classList.remove("hidden")
    document.body.style.backgroundColor = "#F5F5F5"
}

cardNumberInput.addEventListener('input',function(){
    limitChar(cardNumberInput,16)
})

cvvInput.addEventListener('input',function(){
    limitChar(cvvInput,3)
})

function limitChar(input,limit){
    if(input.value.length > limit){
        input.value = input.value.slice(0,limit)
    }
}


modalForm.addEventListener('submit',function(e){
    e.preventDefault()
    document.getElementById("info-modal").classList.add("hidden")
    document.body.style.backgroundColor = "#FFFFFF"
    const userData = new FormData(modalForm)
    const fullName = userData.get("fullName")
    checkoutEl.innerHTML = `
    <div class="order-details">
        <p class ="order-message">Thanks,${fullName}! Your order is on its way!</p>
    </div>
    `
    setTimeout(function(){
        reviewModal.classList.remove('hidden')
    },3000)
})




stars.forEach((star, index) => {
  star.addEventListener('mouseover', function(){
    for (let i = 0; i <= index; i++) {
      stars[i].style.color = 'gold'
    }
  })
  star.addEventListener('mouseleave',function(){
    for(let i = 0;i <= index; i++){
        stars[i].style.color = ''
    }
  })
})