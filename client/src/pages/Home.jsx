




import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from '../components';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
      {title}
    </h2>
  )
}

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');

  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch('https://nrml-ai.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data);
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts();
  }, []);



  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      //500 milliseconds between loading search results
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));

        setSearchedResults(searchResults);
      }, 500)
    );
  }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#2c2d31] text-[32px]'>The Community Showcase</h1>
        {/* <p className='mt-3 mb-4 text-[#666e75] text-[16px] max-w-[500px]'> Hello friends, welcome to nrml-ai v1.1! The completely free, no-sign up AI image generation app.</p> */}
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>Browse through a collection of user-submitted, AI-generated images below. Click 'Create' at the top to generate and share one your own.</p>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>When hovered, all images display the creation prompt, download/view button, and attributed creator's name.</p>
    
        <p className='mt-2 text-[#666e75] text-[11px] max-w-[500px]'>nrml-ai:v:1.1</p>
        {/* <button className='mt-3 text-white bg-[#191919] hover:bg-[#5c61f7]  rounded-full text-xs sm:w-auto px-3 py-2.5 text-center' onClick={() => window.location = 'mailto:mike.levy.rva@gmail.com'}>Contact Me</button> */}

        {/* <button onClick={() => window.location = 'mailto:mike.levy.rva@gmail.com'} class="mt-4 relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
          <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Contact Me</span>
        </button> */}

      </div>

      <div className='mt-12 '>
        <FormField
          labelName="Search posts"
          type='text'
          name='text'
          placeholder='Search posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-#222328'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='NO search results found'

                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title='No posts found'
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home