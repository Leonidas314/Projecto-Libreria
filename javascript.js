

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
//Inicializacion del array de objetos que guarda los objetos "book"
const myBooks = [];
 //Funcion que al ser llamada captura al contenedor y Retorna una HTMLCollection con los divs class book
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
 //Funcion que pushea todos los elementos editButtons
 function captureEditbuttons(capturedChild,editButtons){
    for (let i = 0; i < capturedChild.length; i++) {
        editButtons.push(capturedChild[i].children[2])
    }
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
let fatherNode;
let liElements, obtainedAuthor, obtainedPages , obtainedTitle;
let titleInput,authorInput,pagesInput;
let backscreen ;
function captureClickforEdit(vector){
    vector.forEach(editbutton =>{ editbutton.addEventListener('click', function(){      
        backscreen = document.getElementById('backScreenEdit');
        backscreen.style.display="flex";
        fatherNode = editbutton.parentNode;//closest('div')
        liElements = fatherNode.querySelectorAll('li');
        obtainedTitle = liElements[0].textContent
        obtainedAuthor = liElements[1].textContent
        obtainedPages = liElements[2].textContent
        //obtainedReadStatus = liElements[3];
        titleInput = document.getElementById('title-edit')
        authorInput= document.getElementById('author-edit')
        pagesInput = document.getElementById('pages-edit')
        titleInput.value=obtainedTitle;
        authorInput.value=obtainedAuthor;
        pagesInput.value = obtainedPages;

    })})

}

const cancelEdit = document.getElementById('cancelEdit');//PORQUE FUNCIONA ESTO=?
cancelEdit.addEventListener('click',function(){

    backScreenEdit.style.display="none";
});

const doneEdit = document.getElementById('done-edit')
doneEdit.addEventListener('click',function(){
    var index;
    index=FindIndex(myBooks,liElements[0].textContent,liElements[1].textContent,liElements[2].textContent)
    myBooks[index].title=titleInput.value
    myBooks[index].author=authorInput.value
    myBooks[index].pages=pagesInput.value
    liElements[0].textContent=titleInput.value;
    liElements[1].textContent=authorInput.value;
    liElements[2].textContent=pagesInput.value;
    backscreen.style.display="none";
})
//Funcion que recorre el array de books y encuentra el libro a editar
function FindIndex(bookArray,title,author,pages){
    for (let i = 0; i < bookArray.length; i++) {
        if (bookArray[i].title==title && bookArray[i].author==author && bookArray[i].pages==pages) {
         return i;   
        }
    }
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

//Funcion que al capturar el evento click en cada div book debe desplegar un div para edicion

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
    liTitle.textContent =bookObj.title;
    liAuthor.textContent=bookObj.author;
    liPages.textContent=bookObj.pages;
    //Asignar los hijos al listedBook de forma correcta:
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

//Aparece el formulario para cargar el libro nuevo cambiando la propiedad display a flex
const newButton = document.getElementById('new-button');//Capturar el boton NEW-BOOK
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
    createBookCard(addBook,allchildBooks,xButtons,editButtons);
    //Limpiar inputs
    clearInputs(getTitle,getAuthor,getPages);  
    //Ocultar formulario
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";
})

defaultBooks(myBooks);

captureClickforRemove(captureXbtns(capturarDiv(allchildBooks),xButtons));
captureClickforEdit(captureEditbuttons(capturarDiv(allchildBooks),editButtons));

console.log(myBooks)