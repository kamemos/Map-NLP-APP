import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/font_awesome_sass/fontawesome.scss';
import './assets/font_awesome_sass/fa-solid.scss';
import './assets/font_awesome_sass/fa-brands.scss';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
