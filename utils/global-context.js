import React from 'react';

const GlobalContext = React.createContext({
  submittedTopics: [],
  imageURL: '',
  metadataCID: '',
  update: data => {},
});

export default GlobalContext;
