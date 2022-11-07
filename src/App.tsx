import './App.css'
import {BrowserRouter as Router, Routes} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import {CSSTransition} from "react-transition-group";
import Toasts from "./components/ui/toasts/Toasts";
import {SUCCESS} from "./utils/consts";
import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import {useShowToasts} from "./hooks/useShowToasts";
import {IContext} from "./types/contextTypes";


export const Context = createContext<IContext>()

function App() {

  const { show, onClose, setShow, text, setText, showToasts} = useShowToasts()


  return (
    <Router>
      <Context.Provider value={{showToasts}}>
        <AppRouter />
        <CSSTransition in={show} classNames='alert' timeout={500} unmountOnExit>
          <Toasts typeIcon={SUCCESS} text={text} onClose={onClose}/>
        </CSSTransition>
      </Context.Provider>
    </Router>
  )
}

export default App
