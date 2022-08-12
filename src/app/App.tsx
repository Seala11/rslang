import React from 'react';
import getWordsAPI from 'src/requests/getWordsAPI';
import Button from 'src/components/button/Button';

const App: React.FC = () => {
  getWordsAPI(1, 1);

  return (
    <>
      <Button text="Example" disabled={true}></Button>
      <div className="App">App</div>
    </>
  );
};

export default App;
