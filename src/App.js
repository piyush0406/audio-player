import React,{Component} from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'

import 'react-phone-number-input/style.css'

import Login from './components/Login/Login';
import Verify from './components/Verify/Verify';
import Playlist from './components/Playlist/Playlist';

class App extends Component {

  constructor() {
      super();
      this.state = { game_selected: null };
  }

  render(){
    return(
      //add your component to this by Route path = "/{component name}"
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/verify/:id" element={<Verify/>}/>
            <Route path="/playlist" element={<Playlist/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;