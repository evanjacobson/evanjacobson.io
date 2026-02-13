import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home.jsx'
import Resume from './Pages/Resume.jsx'
import Work from './Pages/Work.jsx'
import WorkDetail from './Pages/WorkDetail.jsx'
import Toolbox from './Pages/Toolbox.jsx'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-a-call" element={<Home autoOpenBooking={true} />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/toolbox" element={<Toolbox />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
