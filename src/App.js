import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";
import { useRef, useState } from "react";
import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  /* react에서 API 호출하기 
  https://jsonplaceholder.typicode.com/comments 의 데이터를 가져와서
  보여주는 역할을 하는 함수 
  */

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };

    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}번째 게시글이 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    console.log("newDiaryList");
    console.log(newDiaryList);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <h2>일기장</h2>
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
