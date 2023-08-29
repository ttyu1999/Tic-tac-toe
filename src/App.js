import React, { useState } from "react";
import "./App.css";
import Item from "./Component/Item";
import PLAYER_DATA from "./store/player_data";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [userInput, setUserInput] = useState(() => {
    const input = prompt('請輸入數字，以產出方格（例：3*3，輸入：3）');
    const parsedInput = parseInt(input, 10);
    return isNaN(parsedInput) ? 3 : parsedInput; // 如果輸入不是有效數字，預設為 3
  }); // 初始時設定 userInput

  const generateNumberArray = (userInput) => {
    const numberArray = [];
    for (let i = 1; i <= userInput; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };

  const table = Math.pow(userInput, 2);
  const tableArray = generateNumberArray(table);

  const { playerOne } = PLAYER_DATA[0];
  const { playerTwo } = PLAYER_DATA[1];

// 計算所有獲勝陣列 start
  const groupWinningNumbers = (array, setArrayLength) => {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, (index += setArrayLength)));
    }
    return newArray;
  };

  const winningArrGroups = groupWinningNumbers(tableArray, userInput);

  const convertArr = winningArrGroups.map((col, i) =>
    winningArrGroups.map((row) => row[i])
  );

  convertArr.map((item) => winningArrGroups.push(item));

  const diagonalArr1 = [];
  const diagonalArr2 = [];

  for (let i = 0; i < userInput; i++) {
    diagonalArr1.push(userInput * i + i + 1);
  }
  for (let i = userInput; i > 0; i--) {
    diagonalArr2.push(userInput * i - i + 1);
  }

  winningArrGroups.push(diagonalArr1.sort((a, b) => a - b));
  winningArrGroups.push(diagonalArr2.sort((a, b) => a - b));
// 計算所有獲勝陣列 end


  const toggleHandler = () => {
    setToggle(!toggle);
  };

  let playerOneWins = false;
  let playerTwoWins = false;
  let isDraw = false;
  let txt;

  const checkWinningCondition = (playerArray) => {
    winningArrGroups.forEach((arr) => {
      const isWinning = arr.every((num) => playerArray.includes(num));
      if (isWinning) {
        if (toggle) {
          playerOneWins = true;
        } else {
          playerTwoWins = true;
        }
      } else {
        if (playerArray.length === Math.ceil(table / 2)) {
          isDraw = true;
        }
      }
    });
  };

  checkWinningCondition(playerOne.arr);
  checkWinningCondition(playerTwo.arr);


  if (!toggle) {
    txt = 'X 的回合';
  } else {
    txt = 'O 的回合';
  }

  if (playerOneWins) {
    txt = "X 獲勝";
  } else if (playerTwoWins) {
    txt = "O 獲勝";
  } else if (isDraw) {
    txt = "平手";
  }

  const resetHandler = () => {
    playerOneWins = false;
    playerTwoWins = false;
    playerOne.arr = [];
    playerTwo.arr = [];
    setToggle(false);
    setIsReset(true);
  }


  return (
    <>
      <section className="tic-tac-toe">
        <h1>雙人版圈圈叉叉</h1>
        <div className="container">
          <ul>
            {tableArray.map((item, index) => {
              return (
                <Item
                  key={index}
                  index={index}
                  userInput={userInput}
                  onToggle={toggleHandler}
                  toggle={toggle}
                  playerWins={playerOneWins || playerTwoWins}
                  isReset={isReset}
                  setIsReset={setIsReset}
                />
              );
            })}
          </ul>
        </div>
        <button className="reset" onClick={resetHandler}><span>RESET</span></button>
        <h2>{txt}</h2>
      </section>
    </>
  );
};

export default App;
