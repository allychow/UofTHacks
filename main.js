import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// ATT Whenever you want to use something, you need to import it first. If you want to make component usable in other parts of the app, you need to export it after creation and import it in the file where you want to use it.


ReactDOM.render(<App />, document.getElementById('app'));
