import React, { useState, useRef, useEffect } from "react";

/*2022-07-02*/
// 리액트 최적화하기
//1) react.memo로 컴포넌트를  묶어주기
//2) useEffect를 이용하여 어떤 아이템이 리렌더링이 일어나는지 확인해보기
//3)

const DiaryItem = ({ ...items }) => {
  const { onEdit, onRemove, id, author, content, emotion, created_date } =
    items;

  useEffect(() => {
    console.log(`${id}번째 아이템 렌더`);
  });

  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);

  //5글자 이상 쓰지않으면 포커스하기
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion} <br />
        </span>
      </div>
      <div className="date">
        <span>날짜 : {new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소하기</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
