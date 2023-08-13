import React from 'react';
import { createRoot } from 'react-dom/client';
import { guid8 } from './extensions/HashFuncs';
import './default-styles.module.scss';
import App from './App';
import { getElementById } from './extensions/ElementExtension';
import { Routes } from './components/router/Routes';
import { Route } from './components/router/Route';
import DatabaseInfo from './components/forms/monitoring/DatabaseInfo';
import BackupDatabaseDialog from './components/forms/monitoring/BackupDialog';
import Login from './Login';

let aliasPath = undefined;
const aliasElement = getElementById("alias-name") as HTMLInputElement;
if (aliasElement) {
    aliasPath = aliasElement.value;
}

const divRootId = guid8();
let divRoot = document.getElementById(divRootId);
if (!divRoot) {
    divRoot = document.createElement("div");
    divRoot.id = divRootId;
    document.body.appendChild(divRoot);
}

const root = createRoot(divRoot);

const apiUrl = window.location.href;

root.render(<React.StrictMode>
    <Routes>
        <Route prefixPath="/autotest/main" element={<App apiUrl={apiUrl} />} />
        <Route path="/autotest/login" element={<Login apiUrl={apiUrl} />} />
        <Route path='/' redirectPath='/autotest/login' />
        <Route path='/autotest' redirectPath='/autotest/login' />
    </Routes>


</React.StrictMode >);