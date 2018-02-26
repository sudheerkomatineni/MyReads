import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ManageShelf from './ManageShelf'

class BookList extends Component {
  render() {
    const { shelves, books, updateShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        {shelves.map(shelf => (
          <div key={shelf.status}>
            <ManageShelf
              title={shelf.title}
              status={shelf.status}
              books={books}
              updateShelf={updateShelf}
            />
          </div>
        ))}
        </div>
          <Link
            to="/search"
            className="open-search"
            >Add a book</Link>
      </div>
    )
  }
}

export default BookList
