import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {
  state = {
    requestedBooks: []
  }

  query: ''

  searchBook = event => {
    this.query = event.target.value.trim()
    let shelfBooks = this.props.books

    if (this.query) {
      BooksAPI.search(this.query).then(response => {
          this.setState({
            requestedBooks: response[0] ? response.map(SearchBook => {
              let shelfBook = shelfBooks.filter(item => item.id === SearchBook.id)
              return shelfBook[0] || SearchBook
            }) : []
          })
      })
    } else {
      this.setState({
        requestedBooks: []
      })
    }
  }

  render() {
    const { requestedBooks } = this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBook}
            />
          </div>
        </div>
        <div className="search-books-results">
            {this.query !== '' && (
              <ol className="books-grid">
                {requestedBooks.map(book => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      updateShelf={this.props.updateShelf}
                    />
                  </li>
                ))}
              </ol>
            )}
		 {this.query !== ('' || undefined) && requestedBooks.length === 0 && (
              <ol className="books-grid">
                <i>No Results found.</i>
              </ol>
         )}
        </div>
      </div>
    )
  }
}

export default BookSearch
