import { useState, useEffect } from "react";
import "./style.css"
import "./LogIn.js"

function Coin() {
  const [input, setInput] = useState('');
  const onChange = (event) => setInput(event.target.value);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then((json) => {
      setData(json);
      setLoading(false);
    });
  }, []);


  return (
    <div>
      <div className="coin">
      <div className="header">
        <h1 className="headerTitle">비교해 드립니다!</h1>
        <p className="headerSub">총: {data.length}가지 코인 자료 보유</p>
      </div>
      
      <div className="money">
        <form>
          <h3>투자하고자 하는 달러를 작성해주세요</h3>
          <input
          onInput={(e) => {
            if (e.target.value.length > e.target.maxLength)
              e.target.value = e.target.value.slice(0, e.target.maxLength);
          }}
          value={input} 
          maxLength={8} 
          onChange={onChange} 
          type="number"/>USD
        </form>
      </div>

      <div className="main">
        <h3>비교하고 싶은 종목을 선택해주세요</h3>
        {loading ? (<strong>Loding...</strong>
        ) : ( 
        <select>
          {data.map(i => <option key={data.id}>{i.name} ({i.symbol}) : ${Math.floor(i.quotes.USD.price)}USD</option>)}
        </select>)}
      </div>

      <div className="footer">
        <p>{} 종목에서 "{input}" USD로</p> 
        <p><strong>""주</strong> 구매 가능합니다.</p>
      </div>

      </div>
    </div>
  );
}

export default Coin;
