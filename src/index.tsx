import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
if (process.env.REACT_APP_NODE_ENV !== 'production') {
  reportWebVitals();
}

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
