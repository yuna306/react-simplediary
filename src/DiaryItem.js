const DiaryItem = ({ ...items }) => {
    const { author, content, emotion, created_date } = items;
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
      </div>
    );
  };
  
  export default DiaryItem;