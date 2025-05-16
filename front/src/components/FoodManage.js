import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./FoodManage.css";
import SendToGemini from "./SendToGemini"; // 경로 주의: utils에 두면 './utils/sendToGemini'

const FoodManage = () => {
  const [date, setDate] = useState(new Date());
  const [foods, setFoods] = useState([{ name: '', gram: '' }]);
  const [history, setHistory] = useState([]);
  const [geminiResult, setGeminiResult] = useState("");

  useEffect(() => {
    const key = date.toISOString().split("T")[0];
    const stored = localStorage.getItem(`food-${key}`);
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      setHistory([]);
    }
  }, [date]);

  const handleAddRow = () => {
    setFoods([...foods, { name: '', gram: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFoods = [...foods];
    updatedFoods[index][field] = value;
    setFoods(updatedFoods);
  };

  const handleConfirm = async () => {
    const filtered = foods.filter(f => f.name && f.gram);
    const formatted = filtered.map(f => `${f.name} ${f.gram}`).join('\n');

    const key = date.toISOString().split("T")[0];
    localStorage.setItem(`food-${key}`, JSON.stringify(filtered));
    setHistory(filtered);

    const geminiResponse = await SendToGemini(formatted);
    setGeminiResult(geminiResponse);
  };

  return (
    <div className="food-manage-container">
      <h2 className="title">식단 관리</h2>

      <div className="calendar-wrapper">
        <Calendar onChange={setDate} value={date} />
      </div>

      <p className="selected-date">
        선택한 날짜: {date.toLocaleDateString()}
      </p>

      <div className="main-content">
        <div className="input-table">
          {foods.map((food, index) => (
            <div key={index} className="food-row">
              <input
                type="text"
                placeholder="음식명"
                value={food.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                className="food-input"
              />
              <input
                type="number"
                placeholder="그램수"
                value={food.gram}
                onChange={(e) => handleInputChange(index, "gram", e.target.value)}
                className="gram-input"
              />
            </div>
          ))}
          <button className="add-button" onClick={handleAddRow}>
            + 음식 추가
          </button>
        </div>

        <div className="history-box">
          <h4>이전 입력</h4>
          {history.length > 0 ? (
            <ul>
              {history.map((item, idx) => (
                <li key={idx}>{item.name} {item.gram}g</li>
              ))}
            </ul>
          ) : (
            <p>기록 없음</p>
          )}
        </div>
      </div>

      <button className="confirm-button" onClick={handleConfirm}>
        확인
      </button>

      {geminiResult && (
        <div className="gemini-result">
          <h4>Gemini 응답</h4>
          <pre>{geminiResult}</pre>
        </div>
      )}
    </div>
  );
};

export default FoodManage;
