import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";
import { useEffect, useRef, useState, useMemo } from "react";
// import OptimizeTest from "./OptimizeTest";
// import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  /* react에서 API 호출하기 
  https://jsonplaceholder.typicode.com/comments 의 데이터를 가져와서
  보여주는 역할을 하는 함수 
  */

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  /*어떤 함수가 있고 그 함수가 어떤 값을 리턴하고 있을 때 리턴까지의 연산을 최적화 하고싶다면? 
  useMemo를 사용하여 dependency array에 어떤 값이 변화할때 연산을 다시 수행할것인지 명시해 주면 됨
  그러면 함수를 값처럼 사용하여 연산최적화를 할 수 있음 */
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  //const { goodCount, badCount, goodRatio } = getDiaryAnalysis(); 실수 금지
  // useMemo는 콜백함수가 리턴하는 “값”을 리턴하게 됨 따라서 함수가 아님
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <h2>일기장</h2>
      {/* <Lifecycle /> */}
      {/* <OptimizeTest /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체일기 : {data.length} </div>
      <div>기분 좋은 일기 개수 : {goodCount} </div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
