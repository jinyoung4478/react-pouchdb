import { localDB, remoteDB, syncDB } from '@/App';
import { useEffect, useState } from 'react';

export const usePouchDB = () => {
  const [data, setData] = useState<any>();

  const init = () => {
    refreshAllData();

    syncDB
      .on('change', ({ change, direction }) => {
        console.log('Change', change);
        console.log('Direction', direction);
        refreshAllData();
      })
      .on('paused', function (err) {
        // replication paused (e.g. replication up to date, user went offline)
      })
      .on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
      })
      .on('denied', function (err) {
        // a document failed to replicate (e.g. due to permissions)
        console.log(err);
      })
      .on('complete', function (info) {
        // handle complete
        console.log(info);
      })
      .on('error', function (err) {
        // handle error
        console.log(err);
      });
  };

  const refreshAllData = async () => {
    try {
      const { rows } = await localDB.allDocs({
        include_docs: true,
      });
      setData(rows);
    } catch (err) {
      console.error(err);
    }
  };

  const addNewDoc = async (doc: any) => {
    try {
      await remoteDB.post(doc);
    } catch (err) {
      console.error(err);
    }
  };

  const removeDoc = async (docId: string) => {
    try {
      var doc = await remoteDB.get(docId);
      await remoteDB.remove(doc);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return { data, addNewDoc, removeDoc };
};
