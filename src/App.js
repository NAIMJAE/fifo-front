import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import './styles/main.scss'
import './styles/imstrap.scss'

function App() {
  return (
    <div className="App">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
