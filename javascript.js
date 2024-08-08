
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
 var editButtons = [];
 var allchildBooks; 
 //Funcion que al ser llamada captura al contenedor y a los divs "Books hijos"
function capturarDiv(captureChild){
    //Capturar el book-container
    const bookContainer = document.getElementById("book-container");
    //Captura los divs hijos del div bookContainer
    captureChild = bookContainer.children;
    console.log(captureChild)

    return captureChild;
}//Retorna una HTMLCollection con los divs class book
 
 //Funcion que pushea en un vector los elementos "x-buttons"
 function captureXbtns(capturedChild,xVector){
     for (let i = 0; i < capturedChild.length; i++) {
         xVector.push(capturedChild[i].children[1]);
     console.log(capturedChild[i].children[0])

     }
     console.log(xVector)
     return xVector
 }
 //Funcion que pushea todos los elementos editButtons
 function captureEditbuttons(capturedChild,editButtons){
    for (let i = 0; i < capturedChild.length; i++) {
        editButtons.push(capturedChild[i].children[2])
    }
    console.log(editButtons)
    return editButtons;
 }


 //Obtener el vector
 //Usar el vector en una funcion para capturar el evento "Click" en cada boton x
 //Asignar el metodo remove() al div padre del evento capturado al boton correspondiente
 function captureClickforRemove(vector){
     vector.forEach(xbutton => { xbutton.addEventListener('click',function(){
         var divPadre=xbutton.parentNode
         divPadre.remove();
     })     
     });
 }

function captureClickforEdit(vector){
    vector.forEach(editbutton =>{ editbutton.addEventListener('click', function(){
        console.log("edit buton capturado")
    })})
}

function createBottomRead(unordlist,readedEstatus){//Funcion que recibe un elemento li de una ul y crea y asigna un boton con determinada clase y texto en funcion del parametro readedEstatus (Booleano)
    const readbotton = document.createElement('button');
    readbotton.className='readButton'
    const newliElement= document.createElement('li')
    newliElement.innerHTML="Readed: "
    newliElement.appendChild(readbotton);
    unordlist.appendChild(newliElement);
    if (readedEstatus == true) {
        readbotton.classList.add('readedYes');
        readbotton.textContent="Yes"
    }else{
        readbotton.classList.add('readedNo')
        readbotton.textContent="No"
    }
    return unordlist;
}



function createBookCard(bookObj,currentBooks,currentXvectors,currentEditbutton){
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

    //Crear editboton para habilitar la edicion del bookdiv
    const editButton = document.createElement('button')
    editButton.classList.add('editButton');
    editButton.textContent='Edit'
    bookdiv.appendChild(editButton)

    captureClickforRemove(captureXbtns(capturarDiv(currentBooks),currentXvectors));
    captureClickforEdit(captureEditbuttons(capturarDiv(currentBooks),currentEditbutton))
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
        createBookCard(defaultBooks,allchildBooks,xButtons,editButtons);
        bookArray.push(defaultBooks);
    }
    return bookArray;
}


const newButton = document.getElementById('new-button');//Capturar el boton NEW-BOOK
//Aparece el formulario para cargar el libro nuevo cambiando la propiedad display a flex
newButton.addEventListener('click',function(){
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="flex";
})


const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click',function(){//Limpiamos los inputs al cancelar

    const getTitle  = document.getElementById('title');
    const getAuthor  = document.getElementById('author');
    const getPages  = document.getElementById('pages');
    clearInputs(getTitle,getAuthor,getPages);  
    
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";//Ocultamos div con formulario
})


const addButton = document.getElementById('addButton');
addButton.addEventListener('click',function(){
    //Capturo inputs.values
    const getTitle  = document.getElementById('title');
    const getAuthor  = document.getElementById('author');
    const getPages  = document.getElementById('pages');
    const getRead = document.getElementById('mycheckbox');
    //Creo nuevo objeto con los valores capturados y lo pusheo en el array
    let addBook = new NewBook(getTitle.value,getAuthor.value,getPages.value,getRead.checked);
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

captureClickforRemove(captureXbtns(capturarDiv(allchildBooks),xButtons));
//captureClickforEdit(captureEditbuttons(capturarDiv(allchildBooks),editButtons));