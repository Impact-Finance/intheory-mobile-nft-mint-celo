import React from 'react';

const GlobalContext = React.createContext({
  submittedTopics: [],
  imageURL: '',
  txnID: '',
  metadataCID: '',
  update: data => {},
});

export default GlobalContext;
