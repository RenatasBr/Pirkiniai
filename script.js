sessionStorage.setItem("data",        
JSON.stringify( [
        {   id: 1,
            name: "name_1",
            quantity: "1 piece",
            category: "bet kas 1"
        },
        {   id: 2,
            name: "name_2",
            quantity: "2 pieces",
            category: "bet kas 2"
        },
        {   id: 3,
            name: "name_3",
            quantity: "3 pieces",
            category: "bet kas 3"
        },
        ] )
); 

updatePurchaseList();

function updatePurchaseList() {
    
    let generatedPurchaseList = "";
    
    let purchaseList = JSON.parse(sessionStorage.getItem("data") );
    
    if(purchaseList === null){
        sessionStorage.setItem("data", JSON.stringify( [] ));
        sessionStorage.setItem("id", "0");
        return;
    }
    
    for (let i = 0; i < purchaseList.length; i++) {
        const purchaseItem = purchaseList[i]; 
        let tableRow = `<tr>
                            <td>${purchaseItem.name}</td>
                            <td>${purchaseItem.quantity}</td>
                            <td>${purchaseItem.category}</td>`+
                           `<td>
                           <div class="edit btn btn-warning" id="edit-${purchaseItem.id}">Redaguoti</div>
                           <div class="delete btn btn-danger" id="delete-${purchaseItem.id}">Trinti įrašą</div>
                           </td>
                            <td>`+
                            `</td>
                        </tr>`;               
                        
        generatedPurchaseList = generatedPurchaseList + tableRow;
    }
    
    let bodyElement = document.getElementById("purchase-items-list");
    
    bodyElement.innerHTML = generatedPurchaseList;
    
    activateDeleteBtns();
    activateEditBtns();
}

function addNewItem() {
    // if(!inputValidation()){
    //     return;
    // }
  
    let purchaseList = JSON.parse(sessionStorage.getItem('data') );

    //1. Get Name from form
    let nameValue = document.getElementById("item-name").value;
    //2. Get Quantity from form
    let quantityValue = document.getElementById("item-quantity").value;
    //3. Get Category from form
    let categoryValue = document.getElementById("item-category").value;
    
    //4. create a new Purchase object, containing id, typed name, quantity and category
    var newPurchaseItem = {
        id:  parseInt(sessionStorage.getItem("id")) + 1,
        name: nameValue,
        quantity: quantityValue,
        category: categoryValue,
    }

    //5. add a new item to the purchase List
    purchaseList.push(newPurchaseItem); 

    sessionStorage.setItem("id", newPurchaseItem.id );
    sessionStorage.setItem("data", JSON.stringify(purchaseList));
   
    //6 Call UpdateHtmlTable function
    clearForm();
    updatePurchaseList();
    
    document.getElementById('item-name').focus();
}

function clearForm() {
    document.getElementById("item-name").value = "";
    document.getElementById("item-quantity").value = "";
    document.getElementById("item-category").value = "";
}

function inputValidation() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("error").classList.remove('success');
    document.getElementById("error").classList.remove('error');

    if( !isValid("item-name") &&
    !isValid("item-quantity") &&
    !isValid("item-category")){
        document.getElementById("error").innerHTML += "<h1>Forma negali būti tuščia</h1>";
        document.getElementById("error").classList.add('error');
        return false;
    }

    if( !isValid("todo-name") &&
    isValid("todo-description") ){
        document.getElementById("error").innerHTML += "<h1>Forma negali buti be pavadinimo</h1>";
        document.getElementById("error").classList.add('error');
        return false;
    }
    document.getElementById("error").classList.add('success');
    document.getElementById("error").innerHTML += "<h1>Jums pavyko pridėti įrašą</h1>";
       
    return true;
}

function isValid(id) {
    
    if(document.getElementById(id).value == ""){
        return false;
    }
    return true;
}

function editEntry(id){
    
    let purchaseList = JSON.parse(sessionStorage.getItem('data') );
        
    for (let i = 0; i < purchaseList.length; i++) { 
        if( `edit-${purchaseList[i].id}` == id){
            activateEditMode(purchaseList[i]);
        } 
    }
}

function activateEditMode(purchaseItem){
        
    //Get Html elements of Name, quanity, category
    document.getElementById("item-name").value = purchaseItem.name;
    document.getElementById("item-quantity").value = purchaseItem.quantity;
    document.getElementById("item-category").value = purchaseItem.category;

    //Update those html elements with todo.name, todo.description
    
    //Unhide the EditButton
    document.getElementById("edit-btn").style = "";
    document.getElementById("submit-btn").style = "display:none";
}


function editItem(){
    // if(!inputValidation2()){
    //     return;
    
    let purchaseList = JSON.parse(sessionStorage.getItem('data'));
   
    var purchaseItemtoEdit = {
        "id":  "",
        "name": "",
        "quantity": "",
        "category": "",
    }

    purchaseItemtoEdit.id = document.getElementById("item-id").value;
    purchaseItemtoEdit.name = document.getElementById("item-name").value;
    purchaseItemtoEdit.quantity = document.getElementById("item-quantity").value;
    purchaseItemtoEdit.category = document.getElementById("item-category").value;

    for (let i = 0; i < purchaseList.length; i++) {
        if( purchaseList[i].id == newPurchaseItem.id){
            purchaseList[i] = purchaseItemtoEdit; 
            break;
        }
    }
    sessionStorage.setItem("data", JSON.stringify(purchaseList));

    updatePurchaseList();

    clearForm();
    document.getElementById("edit-btn").style = "display:none";
    document.getElementById("submit-btn").style = "";
}

function deleteEntry(id) {
    
    let purchaseList = JSON.parse(sessionStorage.getItem('data') );

    for (let i = 0; i < purchaseList.length; i++) { 
        if ( `delete-${purchaseList[i].id}` == id) {
           purchaseList.splice(i,1);
           break;
        }
    }

    sessionStorage.setItem("data", JSON.stringify(purchaseList));

    updatePurchaseList();
}

function activateDeleteBtns() {
    let deleteBtns = document.getElementsByClassName('delete');

    for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click',function(){
            deleteEntry(btn.id);
        });
    }
}

function activateEditBtns() {
    let editBtns = document.getElementsByClassName('edit');
    
    for (let i = 0; i < editBtns.length; i++) {
        let btn = editBtns[i];
        btn.addEventListener('click',function(){
            editEntry(btn.id);
        });
    }
}