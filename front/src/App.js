import React from 'react';
import "./App.scss";
import SearchBox from './components/SearchBox/SearchBox';
import BoxResults from './components/BoxResults/BoxResults';
import ProductDetail from './components/BoxResults/Product/ProductDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <SearchBox />

        <Switch>
          <Route exact path="/items/:id">
            <ProductDetail />
          </Route>

          <Route exact path="/items">
            <BoxResults />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
