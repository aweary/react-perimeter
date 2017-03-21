import React from 'react';

const topics = [
  "React",
  "React-router",
  "Webpack 2",
  "Code splitting",
  "ReasonML",
  "Rust"
];

const TopicList = () => (
  <ol>
    {topics.map(topic => <li key={topic}>{topic}</li>)}
  </ol>
);

export default TopicList
