import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase , ref , push,onValue,remove,set} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


const appSettings = {
    databaseURL : "https://mobile-app-b8e1d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const shoplistInDB = ref(database,"shoppingList")


let inputFieldEl = document.getElementById("input-field")
let buttonEl = document.getElementById("button")
let updateEl = document.getElementById("update")
let idE2 = document.getElementById("id")
let shoppinglistEl = document.getElementById("shopping-list")

buttonEl.addEventListener("click",function(){

    if(!inputFieldEl.value){
        alert("Please Fill the form")
    }else{
        let inputValue = inputFieldEl.value
        push(shoplistInDB,inputValue)
        clearInput()
    }
})

//

onValue(shoplistInDB,function(snapshot){

    if(snapshot.exists()){
        let userArray = Object.entries(snapshot.val())

        clearshoppinglistEl()

        for(let i = 0;i<userArray.length;i++){
            let userItem = userArray[i]
            addShoppinglist(userItem)
        }
    }else {
       shoppinglistEl.innerHTML = "No Item Here...Yet" 
    }
})

function clearshoppinglistEl(){
    shoppinglistEl.innerHTML = "";
}


function clearInput(){
    inputFieldEl.value = "";
}

function addShoppinglist(itemvalue){

    let itemId = itemvalue[0]
    let itemName = itemvalue[1]

shoppinglistEl.innerHTML += 
                `<li>${itemName}<button class= "btn-edit" onclick= 'edit("${itemName}","${itemId}")'><ion-icon name="create-outline"></ion-icon></button>
                <button class= "btn-delete" onclick= 'Delete("${itemId}")'><ion-icon name="trash-outline"></ion-icon></button></li>`


    // let newEl = document.createElement("li")
    // newEl.textContent = itemName

    // newEl.addEventListener("click",function(){
    //     let data = ref(database,`shoppingList/${itemId}`)
    //     remove(data)
    // })

    // shoppinglistEl.append(newEl)

}


window.addShoppinglist = addShoppinglist


// <!----------------------------------------------------EDIT------------------------------------------------ -->
let id = ""
function edit(name,ide1){
    inputFieldEl.value = name
    id = ide1
    updateEl.style.display = "block";
    buttonEl.style.display = "none";
    
}

window.edit =edit

// function upDate(id){
    updateEl.addEventListener("click",function(){
        updateEl.style.display = "none";
        buttonEl.style.display = "block";
        let Name = inputFieldEl.value
        set(ref(database,'shoppingList/'+ id),Name)
        clearInput()
        addShoppinglist()
        
    })
// }
   


// <!----------------------------------------------------DELETE------------------------------------------------ -->

function Delete(id){
    let data = ref(database,`shoppingList/${id}`)
    remove(data)
}

window.Delete = Delete  