import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './containers/HomePage.jsx'
import D04 from './containers/D04.jsx'
import Example1 from './containers/Example1.jsx'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/example1" element={<Example1 />} />
                <Route path="/d04" element={<D04 />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App
