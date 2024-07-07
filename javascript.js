
function NewBook(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;

    const bookdiv = document.createElement('div');
    bookdiv.className= 'book';
    const bookContainer = document.getElementById('book-container')
    bookContainer.appendChild(bookdiv)
}

const newButton = document.getElementById('new-button');
//Aparece el formulario para cargar el libro nuevo
newButton.addEventListener('click',function(){
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="flex";
})

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click',function(){
    const formScreen = document.getElementById('backScreenForm');
    formScreen.style.display="none";
})