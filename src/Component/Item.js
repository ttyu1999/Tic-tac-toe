import { useEffect, useState } from "react";
import PLAYER_DATA from "../store/player_data";

const Item = (props) => {
    const { isReset, toggle, userInput, index, playerWins, setIsReset, onToggle } = props;
    const { playerOne } = PLAYER_DATA[0];
    const { playerTwo } = PLAYER_DATA[1];

    const [ isSpace, setIsSpace ] = useState(true);
    const [ identifier, setIdentifier ] = useState('');

    useEffect(() => {
        if (isReset) {
            setIdentifier('');
            setIsSpace(true);
            setIsReset(false);
        }
    }, [isReset, setIsReset]);

    const currentPlayer = toggle ? playerOne : playerTwo;

    const playerClickHandler = () => {
        if (playerWins || !isSpace) {
          return;
        }

        if (isSpace) {
            setIsSpace(false);
            onToggle();
            setIdentifier(toggle ? playerOne.identifier : playerTwo.identifier);
      
            currentPlayer.arr.push(index + 1);
            currentPlayer.arr.sort((a, b) => a - b);
        }
    }

    return (
        <li style={{width: `calc(${100 / userInput}% - 1rem)`}}>
          <button onClick={playerClickHandler} className={identifier === 'O' ? 'O' : 'X'}><span>{identifier}</span></button>
        </li>
    );
}

export default Item;