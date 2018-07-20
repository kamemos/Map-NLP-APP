import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import editDialogStore from './store/EditDialogStore'    
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
