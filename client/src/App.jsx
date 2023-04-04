import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Home, CreatePost } from './pages'
import { sixr2, nrml, nxus, nrml2 } from './assets';

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full shadow-sm flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          {/* <img src={sixr2} alt="logo" className='w-28 object-contain' /> */}
          {/* <img src={nrml} alt="logo" className='w-32 object-contain' /> */}
          <img src={nrml2} alt="logo" className='w-32 object-contain' />
        </Link>

        <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] hover:bg-[#5c61f7] text-white px-4 py-2 rounded-full'>Create</Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App