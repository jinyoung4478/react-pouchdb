import PouchDB from 'pouchdb';
import { Outlet } from 'react-router-dom';

const ADMIN_ACCOUNT = {
  username: 'admin',
  password: '1234',
};

export const localDB = new PouchDB('test', {
  auto_compaction: true, // 자동 압축 활성화, 기본값 false,
});

export const remoteDB = new PouchDB('http://127.0.0.1:5984/test', {
  auth: ADMIN_ACCOUNT,
  skip_setup: false,
});

export const syncDB = PouchDB.sync(localDB, remoteDB, {
  live: true,
  retry: true,
  // @ts-expect-error
  include_docs: true,
});

function App() {
  return (
    <>
      <Outlet context={{ theme: 'normal' }} />
    </>
  );
}

export default App;
