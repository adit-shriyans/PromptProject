'use client';

import React, { useEffect, useState } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [posts, setPosts] = useState([]);

  const postContentSearch = (keyword) => {
    const contentSearchResult = posts.filter( post => post.prompt.includes(keyword));
    const tagSearchPosts = posts.filter( post => post.tag.includes(keyword));
    const userResult = posts.filter( post => post.creator.username===keyword.toLowerCase());
    const feedPosts = Array.from(new Set([...contentSearchResult, ...tagSearchPosts, ...userResult]));
    setSearchResult(feedPosts);
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    postContentSearch(e.target.value);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const tagSearchPosts = posts.filter( post => post.tag.includes(tag));
    setSearchResult(tagSearchPosts);
  }

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text" 
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input'
        />

      </form>

      <PromptCardList
        data={searchText?searchResult:posts} 
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed