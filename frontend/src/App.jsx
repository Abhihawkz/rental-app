import React from 'react'
import {BroswerRouter, Route, Routes} from "react-router-dom";
const App = () => {
  return (

    <BroswerRouter>
      <Routes>
        <Route path='/'  />
        <Route path='/signup'  />
        <Route path='/products' />
      </Routes>
    </BroswerRouter>
  )
}

export default App;