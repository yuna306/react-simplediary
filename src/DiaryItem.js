const DiaryItem = ({ ...items }) => {
  const { onDelete, id, author, content, emotion, created_date } = items;
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
        <span>내용 : {content}</span>
      </div>
      <button
        onClick={() => {
          console.log(id);
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default DiaryItem;
