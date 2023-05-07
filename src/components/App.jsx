import { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
  };

  setQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div
      // style={{
      //   // height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
      >
        <Searchbar setQuery={this.setQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
