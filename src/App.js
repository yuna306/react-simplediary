import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
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

  /*함수형업데이트*/

  /*useCallback을 사용하면서 dependency array를 []로 두게되면
  새글 작성시, 기존일기가 사라지고 새로작성한 새글만 남게됨

  onCreate함수는 컴포넌트가 마운트되는 시점에 한번만 생성됨
  그 시점의 data state 값이 빈배열이였음.
  즉, onCreate가  가장 마지막에 생성되었을 때 data state가 [] 이란 뜻임

  함수는 컴퍼넌트가 재생성될때 다시생성되는 이유가 있음
  현재의 state값을 참조할 수 있어야 하므로..

  정상적으로 작동시키려면? 아래와 같이 data를 넣어줘야함
  const onCreate = useCallback((author, content, emotion) => {중략...  }, [data]);
  
  [data]가 변경되게되면 함수를 재생성함...
  결론적으로 원하는 동작이 안 됨.

  data state가 변한다고 해서, onCreate가 재생성 되는걸 막고자 하는걸 원했으니까.
  그런데 , onCreate가 재생성 되지 않으면 최신의  data state 값을 참조할 수 가 없어서 또 새글 한개만 남음;;

  이럴 때 함수형 업데이트를 사용하면 됨!
  
 기존코드
  const onCreate = useCallback((author, content, emotion) => {
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
  }, []);
 
  */

  //함수형 업데이트
  //setState에 '값'이 아닌 '함수'를 전달하는 것을 함수형 업데이트라고 함
  //인자(data)를 받아서 아이템을 추가한 데이터를 리턴하는 함수를 전달하게되면
  //dependency array를 []로 두어도 항상 최신의 state를 인자를 통해 참조할 수 있게 됨

  // setData((data) => [newItem, ...data])
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };

    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

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
