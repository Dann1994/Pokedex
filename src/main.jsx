import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { store } from './Store/Store';
import { Provider } from 'react-redux';
import App from './App'
// import './index.css'
import './styles/App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
        < App/>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </>,
)
