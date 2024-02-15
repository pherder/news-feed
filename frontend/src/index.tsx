import React, {StrictMode} from 'react';
import App from "./App";
import {createRoot, Root} from "react-dom/client";
import {AuthProvider} from "./context/AuthContext";
import "bootstrap/scss/bootstrap.scss";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const rootNode = document.getElementById('root');
const root: Root = createRoot(rootNode);
root.render(
    <StrictMode>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </StrictMode>
);
