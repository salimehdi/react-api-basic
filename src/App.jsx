import React, { Suspense, useState, useEffect } from 'react';
import './App.css';
import Loading from './components/Loading';
const ListOfItems = React.lazy(() => import('./components/ListOfItems'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ListOfItems />
      </Suspense>
    </>
  );
}

export default App;