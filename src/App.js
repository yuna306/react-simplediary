import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

const dummyList = [
  {
    id: 1,
    author: "해피",
    content: "해피한 하루",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "럭키",
    content: "럭키데이였어요",
    emotion: 2,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "김철수",
    content: "영희랑 놀러가야지",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "굿모닝",
    content: "미라클모닝을 실천중",
    emotion: 1,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "파트라슈",
    content: "파트라슈와 함께걸었던",
    emotion: 1,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <h2>일기장</h2>
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;