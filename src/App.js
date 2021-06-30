import { Route, Switch } from 'react-router-dom';

import './App.css';
import { Home } from './components/Home';
import { AddOrder } from './components/AddOrder';
import { UpdateOrder } from './components/UpdateOrder';
import {AppProvider} from './Context/AppContext';

function App() {
  return (
    <AppProvider>
    <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/add" component={AddOrder} exact />
          <Route path="/edit/:id" component={UpdateOrder} exact />
        </Switch>
      </div>  
    </AppProvider>
    
  
  );
}

export default App;
