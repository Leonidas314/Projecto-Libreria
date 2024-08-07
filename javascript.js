
function NewBook(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;

}
function clearInputs(title,author,pages){
    return title.value = "",author.value="",pages.value="";
 }

 var xButtons = [];
 var allchildBooks; 
 //Funcion que al ser llamada captura al contenedor y a los divs "Books hijos"
function capturarDiv(captureChild){
    //Capturar el book-container
    const bookContainer = document.getElementById("book-container");
    //Captura los divs hijos del div bookContainer
    captureChild = bookContainer.children;
    return captureChild;
}
 
 //Funcion que pushea en un vector los elementos "x-buttons"
 function captureXbtns(capturedChild,xVector){
     for (let i = 0; i < capturedChild.length; i++) {
         xVector.push(capturedChild[i].children[1]);
     }
     return xVector
 }
 //Obtener el vector
 //Usar el vector en una funcion para capturar el evento "Click" en cada boton x
 //Asignar el metodo remove() al div padre del evento capturado al boton correspondiente
 function captureClickforEach(vector){
     vector.forEach(xbutton => { xbutton.addEventListener('click',function(){
         var divPadre=xbutton.parentNode
         divPadre.remove();
     })     
     });
 }


function createBottomRead(unordlist,readedEstatus){
    const newbutton = document.createElement('button');
    newbutton.className='readButton'
    const newliElement= document.createElement('li')
    newliElement.innerHTML="Readed: "
    newliElement.appendChild(newbutton);
    unordlist.appendChild(newliElement);
    if (readedEstatus == true) {
        newbutton.classList.add('readedYes')
    }else{
        newbutton.classList.add('readedNo')
    }
    return unordlist;
}



function createBookCard(bookObj,currentBooks,currentXvectors){
    //Crear nuevo div 
    const bookdiv = document.createElement('div');
    bookdiv.className= 'book';
    const bookContainer = document.getElementById('book-container')
    bookContainer.appendChild(bookdiv);
    //Crear ul y li elements
    const listedBook = document.createElement('ul'),
     liTitle = document.createElement('li'), 
     liAuthor = document.createElement('li'), 
     liPages = document.createElement('li');
    bookdiv.appendChild(listedBook);
    //Asignar contenido a elementos li desde el objeto
    liTitle.textContent ="Title: "+bookObj.title;
    liAuthor.textContent="Author: "+bookObj.author;
    liPages.textContent="Pages: "+bookObj.pages;
    listedBook.appendChild(liTitle);
    listedBook.appendChild(liAuthor);
    listedBook.appendChild(liPages);
    createBottomRead(listedBook,bookObj.read);

    const deleteButton = document.createElement('button');
    deleteButton.textContent= "X"
    deleteButton.className='deleteButton'
    deleteButton.id='x-button'
    bookdiv.appendChild(deleteButton);



    captureClickforEach(captureXbtns(capturarDiv(currentBooks),currentXvectors));
}

const myBooks = [];


//Funcion que crea por defecto tres cartas de libros

function defaultBooks(bookArray){
    const titles = ["1984","The Hobbit","The Proccess"];
    const authors = ["G. Orwell","J.R.R. Tolkien", "F. Kafka"];
    const pages = ["269","310","264"];
    const read =[true,false,true];
    for (let i = 0; i < titles.length; i++) {
        const defaultBooks = new NewBook(titles[i],authors[i],pages[i],read[i])
        createBookCard(defaultBooks,allchildBooks,xButtons);
        bookArray.push(defaultBooks);
    }
    return bookArray;
}


const newButton = document.getElementById('new-button');
//Aparece el formulario para cargar el libro nuevo
newButton.addEventListener('click',function(){
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="flex";
})

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click',function(){

    const getTitle  = document.getElementById('title');
    const getAuthor  = document.getElementById('author');
    const getPages  = document.getElementById('pages');
    clearInputs(getTitle,getAuthor,getPages);  
    
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";
})


const addButton = document.getElementById('addButton');
addButton.addEventListener('click',function(){
    //Capturo inputs.values
    const getTitle  = document.getElementById('title');
    const getAuthor  = document.getElementById('author');
    const getPages  = document.getElementById('pages');
    //Creo nuevo objeto con los valores capturados y lo pusheo en el array
    let addBook = new NewBook(getTitle.value,getAuthor.value,getPages.value);
    myBooks.push(addBook);
    console.log(myBooks);
    createBookCard(addBook,allchildBooks,xButtons);
    //Limpiar inputs
    clearInputs(getTitle,getAuthor,getPages);  
    //Ocultar formulario
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";
})

defaultBooks(myBooks);

captureClickforEach(captureXbtns(capturarDiv(allchildBooks),xButtons));
