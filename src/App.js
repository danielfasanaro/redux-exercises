import { Switch, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ SearchBar } />
      <Route path="/details/:username" component={ UserDetails } />
    </Switch>
  );
}

export default App;
