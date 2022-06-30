import { useState, useEffect } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  /*
마운트 된 시점에 무언가 작업을 하고 싶다면 콜백함수를 이용!
dependency array는 빈배열로 둠
 */

  useEffect(() => {
    console.log("Mount!");
  }, []);

  /*
업데이트되는 순간
state를 바꾸는순간 (setCount로 카운트를 증가시키는 순간)에 하고싶은일이 있다면
dependency array를 전달하지 않음
 */

  useEffect(() => {
    console.log("update!");
  });

  /*dependency array에 있는 값이 변경되는순간 
useEffect의 콜백함수가 실행 됨 */

  useEffect(() => {
    console.log(`count is update : ${text}`);
  }, [count]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
