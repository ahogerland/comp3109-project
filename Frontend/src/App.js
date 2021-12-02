import React from 'react'
// import ReactDOM from 'react-dom';
import { Switch, Route, Redirect, useHistory, BrowserRouter } from 'react-router-dom'

import { HomePage } from './pages'

function App(props) {

  const history = useHistory();

  return (
    <BrowserRouter>
      <div className="App">
        <Routes history={history}/>
      </div>
    </BrowserRouter>
  );
}

function Routes({history}) {
  return (
    <Switch>
        <Redirect path='/' exact={ true } to="/home" />
        <Route path='/home' exact={ true } component={ HomePage } />
        <Route render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default App;
