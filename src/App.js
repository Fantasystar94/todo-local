import React from 'react';
import logo from './logo.svg';
import './App.css';
import Top from './component/Top';
import List from './component/List';
import Main from './component/Main';
import { Route,Routes } from 'react-router-dom';
import Footer from './component/Footer'
import { TodoProvider } from './contexts/TodoContext';
function App() {
  return (
    <TodoProvider>
       <Top/>
       <List/>
       <Main/>
       <Footer/>
    </TodoProvider>
  );
}

export default App;
