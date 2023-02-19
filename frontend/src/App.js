import React, { useLayoutEffect } from "react";
import { Route, Switch, Router, useLocation } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import Home from './components/Home'
import Video from './components/Video'
import Upload from './components/Upload'

function App() {
 
  const location = useLocation();
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <Switch>

        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/video' component={Video} />
          

        <Route path='/upload'>
          <Upload />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </div>

    // <h1>Hello Faisal</h1>
  );
}

export default App;
