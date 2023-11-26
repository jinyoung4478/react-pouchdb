import { usePouchDB } from '@/hooks/usePouchDB';
import { useState } from 'react';

function HomePage() {
  const [text, setText] = useState('');
  const { data, addNewDoc, removeDoc } = usePouchDB();

  const addNewMenu = () => {
    setText('');
    addNewDoc({ name: text });
  };

  const removeMenu = (id: string) => {
    removeDoc(id);
  };

  return (
    <>
      <h1 className="text-xl text-slate-700 p-4">등록된 총 메뉴 수: {data && data.length}개</h1>
      <div className="px-4 mb-4">
        <input type="text" className="border border-slate-500 py-4 px-6" onChange={(e) => setText(e.target.value)} />
        <button className="py-4 px-6 text-slate-200 bg-slate-500 border border-slate-300" onClick={addNewMenu}>
          Add New Menu
        </button>
      </div>
      {data && (
        <div className="flex flex-wrap px-4">
          {data.map((item: any) => (
            <div key={item.id} className="flex flex-col w-1/3 p-4 mb-8 border-box border border-gray-300 text-center">
              {item.doc.name}
              <div>
                <button className="w-full text-red-500" onClick={() => removeMenu(item.id)}>
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
