var array = []; //array dos "produtos"
var count = 0; //contador e indice global;
var editIndice = -1; //quebrar o indice do array ao editar;
var clientsArray = [{}]//array da api;
clientsArray.shift(); 
api() //resolver o bug do pos 0;

function addToCart(){
    
  let product = document.querySelector('#nome').value;
  let display = document.querySelector('.itensList')

  let clearAll = document.querySelector('#clear');
  clearAll.style.display = 'block'

  if(product == ''){
    return;
  }    
  array.push(product)

  api()
  textoHtml();
  
  count++
  document.querySelector('#nome').value = ''; //zerar o texto após o disparo;

}
//product = produto clicado
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
  count=0;
  //zerando e setando o array novamente
  while(count < array.length){
     textoHtml();
    count++
  }  
}
function clearAll(){
  let clearDisplay = document.querySelector('.itensList')
  let clearAll = document.querySelector('#clear');
  clearAll.style.display = 'none'
  array = [];
  clearDisplay.innerHTML = ''
  count = 0;
  clientsArray.splice(0, clientsArray.length +1)
  api()
}
function edit(item){
  
    //item? => Índice da tag com ID iteravel 

    let nomeDoEditado = array[item]

    document.querySelector('#nome').value = nomeDoEditado;
  
    editIndice = item; //variavel recebendo o indice correto, para o save;

    console.log(editIndice)
    let botaoSave = document.querySelector('#botaoSave');
    botaoSave.style.display = 'block';
    document.querySelector('#nome').value = '';
    

}
function save(){
    let product = document.querySelector('#nome').value;
    let display = document.querySelector('.itensList');
    if(product == ''){
      return; 
    }
    if(editIndice > -1){
      array[editIndice] = product
    }
    count = 0;
    display.innerHTML = '';
    while(count < array.length){
      textoHtml()
      count++
    }
    console.log(array)
    editIndice = -1; //reinicia a variável.
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
        .catch(error => {
            console.log(error.message);
        });       
}
function textoHtml(){
  let display = document.querySelector('.itensList');

  display.innerHTML += `
    <div class="container text-center" id="conteudo">
    <div id='${count}' class="row"> 
      <div class="col-sm">
        ${clientsArray[count].clientEmailApi}<br>${clientsArray[count].clientNameApi}
      </div>
      <div class="col-sm">
        ${array[count]}
      </div>
      <div class="col-sm">
        <ion-icon name="trash-outline" id="botaoLixo" onclick="remove('${array[count]}')"></ion-icon>
              <ion-icon name="create-outline" id="botaoEdit" onclick="edit(${count})"></ion-icon>
      </div>
    </div>
  </div>`
}