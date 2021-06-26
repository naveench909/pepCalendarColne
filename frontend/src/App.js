// import { Router } from "express";
import Modal from "react-modal"

import Error from './pages/error'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

Modal.setAppElement('#root')
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route  path="*">
          <Error/>
        </Route>
        
      </Switch>
    </Router>
  );
}

export default App;
