import PouchDB from 'pouchdb';
import { Outlet } from 'react-router-dom';

function App() {
  console.log(PouchDB);
  return (
    <>
      <Outlet context={{ theme: 'normal' }} />
    </>
  );
}

export default App;
