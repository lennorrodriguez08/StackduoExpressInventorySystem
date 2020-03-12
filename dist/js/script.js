// Person Constructor

function Orders (month, day, year, itemName, qty, price) {
   this.month = month;
   this.day = day;
   this.year = year;
   this.itemName = itemName;
   this.qty = qty;
   this.price = price;
}

function editOrders (qty, itemName, price) {
   this.qty = qty;
   this.itemName = itemName;
   this.price = price;
}

// Parent Function or what so called it

function processOrders () {}

processOrders.prototype.appendValue = function (orders) {
   const row = document.createElement('tr');
   row.innerHTML = `
   <td>${orders.month + 1}&mdash;${orders.day}&mdash;${orders.year}</td>
   <td>${orders.qty}</td>
   <td>${orders.itemName}</td>
   <td class="table-price">${orders.price}</td>
   <td>
      <a href="#" class="action-edit">Edit</a>
      <a href="#" class="action-delete">Delete</a>
   </td>
   `;
   const orderList = document.querySelector('.order-list');
   orderList.appendChild(row);
}

// FOREACH PRICE TO CALCULATE.
processOrders.prototype.totalPrice = function () {
   const totalPrice = document.querySelectorAll('.table-price');
   let uiValue = 0;
   totalPrice.forEach(function(price) {
      uiValue += Number(price.textContent);
   });
   const uiTotalAmount = document.querySelector('.total-amount').value = uiValue;
}

// CLEAR QTY AND PRICE FIELD WHEN ORDER IS CONFIRMED
processOrders.prototype.clearTopField = function () {
   document.querySelector('.qty').value = '';
   document.querySelector('.price').value = '';
}

// CLEAR AMOOUNT RECEIVED AND TOTAL BALANCE FIELD WHEN ORDER IS DELETED
processOrders.prototype.clearBottomField = function () {
   document.querySelector('.received-amount').value = '';
   document.querySelector('.total-balance').value = '';
}

processOrders.prototype.alertNotif = function (color, msg) {
   const wawa = document.querySelector('#header .container');
   const hahaha = document.querySelector('#header h1');
   const div = document.createElement('div');
   div.style.backgroundColor = color;
   div.style.color = '#fff';
   div.className = 'to-alert';
   div.appendChild(document.createTextNode(msg));
   wawa.insertBefore(div, hahaha);
}

// EVENT FOR PRESSING BTN CONFIRM ORDER

const confirmOrder = document.querySelector('.btn-confirm');
confirmOrder.addEventListener('click', function() {
   const date = new Date();
   const month = date.getMonth();
   const day = date.getDate();
   const year = date.getFullYear();
   const itemName = document.querySelector('.select-item').value;
   const qty = document.querySelector('.qty').value;
   const price = document.querySelector('.price').value;
   const orders = new Orders(month, day, year, itemName, qty, price);
   const processorders = new processOrders();

   if (itemName === '' || qty === '' || price === '' || qty <= 0 || price <= 0) {
      processorders.alertNotif('#E71D36','Please double check all the item fields')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
   }  else {
      processorders.appendValue(orders);
      processorders.totalPrice();
      processorders.clearTopField();
      processorders.alertNotif('#008148','Order Added')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
   }
})

// EVENT FOR AMOUNT CALCULATION

const UIreceivedAmount = document.querySelector('.received-amount');
UIreceivedAmount.addEventListener('input', function(e) {
   const totalPrice = document.querySelectorAll('.table-price');
   let uiValue = 0;
   totalPrice.forEach(function(price) {
      uiValue += Number(price.textContent);
   });
   const uiTotalAmount = document.querySelector('.total-amount').value = uiValue;
   let UIreceived = uiValue - UIreceivedAmount.value;
   document.querySelector('.total-balance').value = UIreceived;
})


// EVENT FOR DELETING ORDER
const orderList = document.querySelector('.order-list');
orderList.addEventListener('click', function(e) {
   if (e.target.classList.contains('action-delete')) {
      e.target.parentElement.parentElement.remove();
      const processorders = new processOrders();
      processorders.totalPrice();
      processorders.clearBottomField();
      processorders.alertNotif('#E71D36','Order Deleted')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
   }
})


// EVENT FOR EDITING ORDER
const newOrderList = document.querySelector('.order-list');
newOrderList.addEventListener('click', function(e) {
   if (e.target.classList.contains('action-edit')) {
      e.target.classList.add('modal-purpose');
      const modal = document.querySelector('.edit-modal');
      modal.style.display = 'block';
      const price = e.target.parentElement.previousElementSibling.textContent;
      const itemName = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
      const qty = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
      const modalQty = document.querySelector('.modal-qty').value = qty;
      const modalItemName = document.querySelector('.modal-item-name').value = itemName;
      const modalPrice = document.querySelector('.modal-price').value = price;
   }
});


// EVENT FOR CLOSING THE MODAL
const modalBox = document.querySelector('.edit-modal');
modalBox.addEventListener('click', function(e) {
   if (e.target.classList.contains('fa-times') || e.target.classList.contains('action-delete') || e.target.classList.contains('edit-modal')) {
      const processorders = new processOrders();
      processorders.alertNotif('#E71D36','Editing Of Order Unsuccessful')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
      modalBox.style.display = 'none';
   }  else if (e.target.classList.contains('modal-confirm')) {
      const editBtn = document.querySelector('.modal-purpose');
      const newPrice = editBtn.parentElement.previousElementSibling;
      const newItemName = editBtn.parentElement.previousElementSibling.previousElementSibling;
      const newQty = editBtn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling;
      const modalQty = document.querySelector('.modal-qty').value;
      const modalItemName = document.querySelector('.modal-item-name').value;
      const modalPrice = document.querySelector('.modal-price').value;
      newItemName.innerHTML = modalItemName;
      newPrice.innerHTML = modalPrice;
      newQty.innerHTML = modalQty;
      const actionEdit = document.querySelector('.action-edit').className = 'action-edit';
      const totalPrice = document.querySelectorAll('.table-price');
   let uiValue = 0;
   totalPrice.forEach(function(price) {
      uiValue += Number(price.textContent);
   });
   const uiTotalAmount = document.querySelector('.total-amount').value = uiValue;
      modalBox.style.display = 'none';
      const processorders = new processOrders();
      processorders.alertNotif('#008148','Order Edited Successfully')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
   }
})


document.querySelector('.btn-cancel').addEventListener('click', function(e) {
   const processorders = new processOrders();
   if (confirm('Are you sure you want to cancel the transaction?')) {
      processorders.clearBottomField();
      processorders.clearTopField();
      const uiTotalAmount = document.querySelector('.total-amount').value = 0;
      document.querySelector('.order-list').innerHTML = '';
      processorders.alertNotif('#E71D36','Transaction Cancelled')
      setTimeout(function() {
         document.querySelector('.to-alert').remove();
      }, 2000);
   }
})


document.querySelector('.btn-print').addEventListener('click', function(e) {
   function printContent() {
     let mainBody = document.body.innerHTML;
    
     window.print();
     document.body.innerHTML = mainBody;
   }
   
   printContent();
})




























// function Orders (month, day, year, qty, itemName, price) {
//    this.itemName = itemName;
//    this.qty = qty;
//    this.price = price;
//    this.month = month;
//    this.day = day;
//    this.year = year;
// }


// // PARENT PROTOTYPE
// function processOrder () {}


// // CHILD - ADD ORDER
// processOrder.prototype.addOrder = function (orders) {
//    const row = document.createElement('tr');
//    row.innerHTML = `
//    <td>${orders.month}&mdash;${orders.day}&mdash;${orders.year}</td>
//    <td>${orders.qty}</td>
//    <td>${orders.itemName}</td>
//    <td>${orders.price}</td>
//    <td>
//       <a href="#" class="action-edit">Edit</a>
//       <a href="#" class="action-delete">Delete</a>
//    </td>
//    `;
//    const orderList = document.querySelector('.order-list');
//    orderList.appendChild(row);
// }


// // GET VALUE 
//    const confirmOrder = document.querySelector('.btn-confirm');

//    confirmOrder.addEventListener('click', function(e) {
//       const itemName = document.querySelector('.select-item').value;
//       const qty = document.querySelector('.qty').value;
//       const price = document.querySelector('.price').value;
//       const date = new Date();
//       const month = date.getMonth();
//       const day = date.getDate();
//       const year = date.getFullYear();

//       const orders = new Orders(month, day, year, qty, itemName, price);
//       const processorder = new processOrder();

//       if (itemName === '' || qty === '' || price === '') {
//          alert('FILL UP ALL FIELDS');
//       }  else {
//          processorder.addOrder(orders);
//       }

//    });
   






