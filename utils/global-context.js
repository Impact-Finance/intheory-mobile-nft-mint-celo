import React from 'react';

const GlobalContext = React.createContext({
  submittedTopics: [],
  imageURL: '',
  update: data => {},
});

export default GlobalContext;
