import logo from './logo.svg';
import './App.css';
import { Header, NewsFeed, Stats } from './component'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <NewsFeed />
          {*/ Stats */}
          <Stats />
        </div>
      </div>
      {/* Body */}
    </div>
  );
}

export default App;
