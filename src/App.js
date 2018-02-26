import React, {Component} from 'react'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  shelves = [
    {
      title: 'Currently Reading',
      status: 'currentlyReading'
    },
    {
      title: 'Want To Read',
      status: 'wantToRead'
    },
    {
      title: 'Read',
      status: 'read'
    }
  ]

  componentDidMount() {
    this.getBooks()
  }
  getBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getBooks()
    })
  }

  render() {
    const {books} = this.state
    const {status, title} = this.shelves
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            books={books}
            shelves={this.shelves}
            title={title}
            status={status}
            updateShelf={this.updateShelf}
          />
        )}/>

        <Route path="/search" render={() => (
            <BookSearch
              books={books}
              updateShelf={this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
