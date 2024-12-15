import { useContext, useEffect } from "react";
import React, { Component } from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import noteContext from "../context/noteContext";

const About = ()=> {
  const a = useContext(noteContext)
  useEffect(()=>{
    a.update();
  },[]) // eslint-disable-next-line
    return (
        <>
        <h1>I am about {a.state.name} and she is in class {a.state.class}</h1>
        </>
    )
}

export default About;