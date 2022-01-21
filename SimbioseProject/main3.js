var array = [];
var x = 0;
var editIndice = -1;
var clientsArray = [{}]
clientsArray.shift();
api()

function addToCart(){
    
    let product = document.querySelector('#nome').value;

    let clearAll = document.querySelector('#clear');
    clearAll.style.display = 'block'

    if(product == ''){
      return;
    }    
    array.push(product)

    api()
    console.log(array)

    let display = document.querySelector('.itensList')

    display.innerHTML += `
    <div class="container text-center" id="conteudo">
    <div id='${x}' class="row">
      <div class="col-sm">
        ${clientsArray[x].clientEmailApi}<br>${clientsArray[x].clientNameApi}
      </div>
      <div class="col-sm">
        ${array[x]}
      </div>
      <div class="col-sm">
        <ion-icon name="trash-outline" id="botaoLixo" onclick="remove('${array[x]}')"></ion-icon>
              <ion-icon name="create-outline" id="botaoEdit" onclick="edit(${x})"></ion-icon>
      </div>
    </div>
  </div>`
  
  x++
  document.querySelector('#nome').value = '';

}

function remove(product){

  let indice = array.indexOf(product);
  console.log(product)

  array.splice(indice, 1);
  clientsArray.splice(indice,1)

  let display = document.querySelector('.itensList');
  let clearAll = document.querySelector('#clear');
  clearAll.style.display = 'block'
  let buttonSave = document.querySelector('#botaoSave');
  buttonSave.style.display = 'none'

  display.innerHTML = '';
  x=0;
  while(x < array.length){
      display.innerHTML += `
      <div class="container text-center" id="conteudo">
    <div id='${x}' class="row">
      <div class="col-sm">
        ${clientsArray[x].clientEmailApi}<br>${clientsArray[x].clientNameApi}
      </div>
      <div class="col-sm">
        ${array[x]}
      </div>
      <div class="col-sm">
        <ion-icon name="trash-outline" id="botaoLixo" onclick="remove('${array[x]}')"></ion-icon>
              <ion-icon name="create-outline" id="botaoEdit" onclick="edit(${x})"></ion-icon>
      </div>
    </div>
  </div>`
    x++
  }
  console.log(array)
    
}

function clearAll(){
  let clearDisplay = document.querySelector('.itensList')
  let clearAll = document.querySelector('#clear');
    clearAll.style.display = 'none'

  array = [];

  clearDisplay.innerHTML = ''
  x = 0;
  clientsArray.splice(0, clientsArray.length +1)
  api()
  console.log(array)
}

function edit(item){
  
    
    let ind = array[item]

    document.querySelector('#nome').value = ind;
  
    editIndice = item;

    console.log(editIndice)
    let botaoSave = document.querySelector('#botaoSave');
    botaoSave.style.display = 'block';
    

}
function save(){
    let product = document.querySelector('#nome').value;
    //let product2 = document.querySelector('#nome').value;
    let display = document.querySelector('.itensList');
    //let indice;
    
    if(product == ''){
      return; 
    }
    if(editIndice > -1){
      array[editIndice] = product
  }
    //array.splice(indice, 1 , product2)
    

    x = 0;
    display.innerHTML = '';
    while(x < array.length){
      display.innerHTML += `
      <div class="container text-center" id="conteudo">
    <div id='${x}' class="row">
      <div class="col-sm">
        ${clientsArray[x].clientEmailApi}<br>${clientsArray[x].clientNameApi}
      </div>
      <div class="col-sm">
        ${array[x]}
      </div>
      <div class="col-sm">
        <ion-icon name="trash-outline" id="botaoLixo" onclick="remove('${array[x]}')"></ion-icon>
              <ion-icon name="create-outline" id="botaoEdit" onclick="edit(${x})"></ion-icon>
      </div>
    </div>
  </div>`

      x++
    }
    console.log(array)
    editIndice = -1;
    document.querySelector('#nome').value = '';
    let botaoSave = document.querySelector('#botaoSave');
    botaoSave.style.display = 'none';
     
}

function api() {
    fetch('https://randomuser.me/api/?results=1%27')
        .then(resp => resp.json())
        .then(data => {
            let clients = data.results;
            
            return clients.map(client => {
                             
                let clientNameApi = (client.name.first);
                let clientEmailApi = (client.email)
                
                
                clientsArray.push({clientEmailApi, clientNameApi });
                console.log(clientsArray)
            })
        })
        .catch(function (error) {
            console.log(error.message);
        });
        
        
}
