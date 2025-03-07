import * as styles from "../styles/SeaBattle.module.css"
import { Cell } from "./SeaBattle";

export function GameBoard({ board, onCellClick, onDrop, handleDragOver, ships, shots,isBotBoard,showBotShips }) {
  return (
    <div className={styles.board}>
      {board.map((row, x) => (
          row.map((cell, y) => (
            <Cell
              key={`${x}-${y}`}
              x={x}
              y={y}
              value={cell}
              onClick={onCellClick}
              onDrop={onDrop}
              handleDragOver={handleDragOver}
              ships={ships}
              shots={shots} // Передаем выстрелы в Cell
              isBotBoard={isBotBoard} 
              showBotShips={showBotShips}
            />
          ))
      ))}
    </div>
  );
}