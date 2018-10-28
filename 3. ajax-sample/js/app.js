
const bookModel = {
    apiUrl : 'https://www.googleapis.com/books/v1/volumes', 
    keywork : 'javascript',
    currentBook: {},
    books: []
}

const controller = {
    init: function () {
        this.retrieveBookFromAPI();
        bookView.init();
    },
    retrieveBookFromAPI: function (startIndex = 0) {
        fetch(`${model.apiUrl}?q=${model.keywork}&startIndex=${startIndex}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (books) {
                model.books = books.items;
                model.currentBook = books.items[0];
                bookListView.render();
                bookView.render();
            });
    },
    getBooks: function () {
        return model.books;
    },

    getCurrentBook: function () {
        return model.currentBook;
    }
}

const bookListView = {
    init: function () {
        this.render();
    },
    render: function () {
        const books = controller.getBooks();
        console.log(books);
    },
    setCurrentBook: function () {

    }

}

const bookView = {
    init: function(){
        this.viewport = document.getElementById('viewerCanvas');
        this.render();
    },
    render: function () {
        google.books.load();
        google.books.setOnLoadCallback(function(){
            const viewer = new google.books.DefaultViewer(bookView.viewport);
            const currentBook = controller.getCurrentBook();
            viewer.load(currentBook.id);
        });
    },

}

controller.init();
