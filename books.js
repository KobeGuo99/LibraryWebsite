let books; //global books var

async function renderBooks(filter){
    /**
     * displays all the books in getBooks() to the page and sorts accordingly with filter
     * @param {string} filter - the filter to decide how to sort the books
     */

    const booksWrapper = document.querySelector('.books');

    booksWrapper.classList += ' books__loading'; //adds loading icon when loading books

    if(!books){
        books = await getBooks();
    } 

    booksWrapper.classList.remove('books__loading'); //remove loading icon when books load in
    
    if(filter === 'LOW_TO_HIGH'){
        console.log(filter)
        //if there is a sale price, it uses the sale price as the price when filtering
        books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    } else if(filter === 'HIGH_TO_LOW'){
        console.log(filter)
        books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    } else if(filter === 'RATING'){
        console.log(filter)
        books.sort((a, b) => b.rating - a.rating);
        console.log(books);
    }

    const booksHTML = books.map(book => {
        return `<div class="book">
            <figure class="book__img--wrapper">
                <img class="book__img" src="${book.url}" alt="">
            </figure>
            <div class="book__title">
                ${book.title}
            </div>
            <div class="book__ratings">
                ${ratingsHTML(book.rating)}
            </div>
            <div class="book__price">
                ${priceHTML(book.originalPrice, book.salePrice)}
            </div>
        </div>`
    }).join("");

    booksWrapper.innerHTML = booksHTML;
}

function filterBooks(event){
    renderBooks(event.target.value);
}

function ratingsHTML(rating){
    /**
     * returns the amount of stars to put based on book's rating
     * 
     * @param {number} rating - the rating from 0 to 5
     * @returns {string} An HTML string representing the star ratings with full, half, and empty stars.
     */
    let ratingHTML = '';
    let count = 0;

    for(let i = 0; i < Math.floor(rating); ++i){
        ratingHTML += '<i class="fas fa-star"></i>\n';
        count += 1;
    }

    if(!Number.isInteger(rating)){
        ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
        count += 1;
    }

    let remainingStars = 5 - count;

    for(let i = 0; i < remainingStars; ++i){
        ratingHTML += '<i class="far fa-star"></i>\n';
    }
    return ratingHTML;
}

function priceHTML(originalPrice, salePrice){
    /**
     * returns the sale price if there is a sale and the original price if not
     * @param {number} originalPrice the original price
     * @param {number} salePrice the sale price. null if there is no sale
     */
    if(!salePrice){
        return `$${originalPrice.toFixed(2)}`;
    }
    return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`;
}


setTimeout(() => {
    renderBooks();
});


// TEST DATA
function getBooks() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {
                  id: 1,
                  title: "Crack the Coding Interview",
                            url: "assets/crack the coding interview.png",
                  originalPrice: 49.95,
                  salePrice: 14.95,
                  rating: 4.5,
                },
                {
                  id: 2,
                  title: "Atomic Habits",
                  url: "assets/atomic habits.jpg",
                  originalPrice: 39,
                  salePrice: null,
                  rating: 5,
                },
                {
                  id: 3,
                  title: "Deep Work",
                  url: "assets/deep work.jpeg",
                  originalPrice: 29,
                  salePrice: 12,
                  rating: 5,
                },
                {
                  id: 4,
                  title: "The 10X Rule",
                  url: "assets/book-1.jpeg",
                  originalPrice: 44,
                  salePrice: 19,
                  rating: 2.5,
                },
                {
                  id: 5,
                  title: "Be Obsessed Or Be Average",
                  url: "assets/book-2.jpeg",
                  originalPrice: 32,
                  salePrice: 17,
                  rating: 4,
                },
                {
                  id: 6,
                  title: "Rich Dad Poor Dad",
                  url: "assets/book-3.jpeg",
                  originalPrice: 70,
                  salePrice: 12.5,
                  rating: 5,
                },
                {
                  id: 7,
                  title: "Cashflow Quadrant",
                  url: "assets/book-4.jpeg",
                  originalPrice: 11,
                  salePrice: 10,
                  rating: 4,
                },
                {
                  id: 8,
                  title: "48 Laws of Power",
                  url: "assets/book-5.jpeg",
                  originalPrice: 38,
                  salePrice: 17.95,
                  rating: 4.5,
                },
                {
                  id: 9,
                  title: "The 5 Second Rule",
                  url: "assets/book-6.jpeg",
                  originalPrice: 35,
                  salePrice: null,
                  rating: 4,
                },
                {
                  id: 10,
                  title: "Your Next Five Moves",
                  url: "assets/book-7.jpg",
                  originalPrice: 40,
                  salePrice: null,
                  rating: 4,
                },
                {
                  id: 11,
                  title: "Mastery",
                  url: "assets/book-8.jpeg",
                  originalPrice: 30,
                  salePrice: null,
                  rating: 4.5,
                },
              ])
        }, 1000)
    });
  }