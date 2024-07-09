
function NewBook(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;

}

function clearInputs(title,author,pages){
    return title.value = "",author.value="",pages.value="";
 }

function createBookCard(bookObj){
    const bookdiv = document.createElement('div');
    bookdiv.className= 'book';
    const bookContainer = document.getElementById('book-container')
    bookContainer.appendChild(bookdiv)
    const listedBook = document.createElement('ul'), liTitle = document.createElement('li'), liAuthor = document.createElement('li'), liPages = document.createElement('li');
    bookdiv.appendChild(listedBook);
    liTitle.textContent = "Title: "+ bookObj.title;
    liAuthor.textContent="Author: "+bookObj.author;
    liPages.textContent="Pages: "+bookObj.pages;
    listedBook.appendChild(liTitle);
    listedBook.appendChild(liAuthor);
    listedBook.appendChild(liPages);

}

const myBooks = [];


//Funcion que crea por defecto tres cartas de libros

function defaultBooks(bookArray){
    const titles = ["1984","The Hobbit","The Proccess"];
    const authors = ["G. Orwell","J.R.R. Tolkien", "F. Kafka"];
    const pages = ["269","310","264"];
    for (let i = 0; i < titles.length; i++) {
        const defaultBooks = new NewBook(titles[i],authors[i],pages[i])
        createBookCard(defaultBooks);
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
    createBookCard(addBook);
    //Limpiar inputs
    clearInputs(getTitle,getAuthor,getPages);  
    //Ocultar formulario
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";
})

defaultBooks(myBooks);