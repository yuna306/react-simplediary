import React, { useEffect, useState, useRef } from "react";

// 컴포넌트가 랜더링이 되는 경우
// 1)본인이 가진 state가 변경될 때
// 2)본인이  전달받은 props 값이 변경될 때
// 3)부모컴포넌트가 랜더링이 일어나거나

//DiaryEditor의 경우 넘겨받고 있는  onCreate 함수 때문에 계속 랜더링이 발생함
//onCreate를 계속 다시 생성되지 않게 하기위하여 useCallback을 사용

//css 입힐때 컴포넌트의 이름과 className이 정확히 일치되면 편리하니까(강사님 방식)
const DiaryEditor = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log(state);

    //js의 querySelector 처럼 특정 DOM을 선택해서 조작하고 싶을때
    //useRef를 사용! 현재 가르키는 값을 current를 통하여 불러올 수 있음!
    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장성공!!");
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>3</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

//최적화 할때 React.memo로 감싸줘도 되지만 (안 되는건 아님)
//const DiaryEditor = React.memo(({ onCreate }) => {...코드중략...});
//그 아래에 80라인 가까운 코드가 존재함. 아래와 같이 간결하게 사용가능!
//export default React.memo(DiaryEditor);

export default React.memo(DiaryEditor);
