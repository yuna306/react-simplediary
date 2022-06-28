import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {
  return (
    <div className="DiaryList">
      <h2>다이어리 리스트</h2>

      <h4>총 {diaryList.length}개의 일기가 있습니다</h4>

      <div>
        {/* react-jsx-dev-runtime.development.js:99 Warning: Each child in a list
        should have a unique "key" prop. */}
        {diaryList.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;