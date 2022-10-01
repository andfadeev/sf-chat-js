import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import {ChatComponent} from "./Chat";
import TimeAgo from 'javascript-time-ago';

import ru from 'javascript-time-ago/locale/ru.json';
import {apiSlice} from "./features/api/apiSlice";
// import {ChatComponent} from "./Chat";
import {ChatInitiationComponent} from "./ChatInitiation";

TimeAgo.addDefaultLocale(ru);

// todo: fix to use in sf-clj page
const container = document.getElementById('chatInitiationContainer');
const root = createRoot(container);

store.dispatch(apiSlice.endpoints.getDirectMessages.initiate());
store.dispatch(apiSlice.endpoints.getSession.initiate());

root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<ChatComponent/>*/}
            <ChatInitiationComponent/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
