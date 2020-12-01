import logo from './logo.svg';
import './App.css';
import { Header, Newsfeed, Stats } from './component'

function App() {
  return (
    <div className="App">
      {/* Header */}
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <Newsfeed />
          {/* Stats */}
          <Stats />
        </div>
      </div>
      {/* Body */}
    </div>
  );
}

export default App;
