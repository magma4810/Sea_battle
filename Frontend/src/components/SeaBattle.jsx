import { GameBoard } from "./GameBoard";
import { useState, useEffect } from "react";
import * as styles from "../styles/SeaBattle.module.css";

export default function SeaBattle() {
  const [ships, setShips] = useState([
    { id: 1, size: 4, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 2, size: 3, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 3, size: 3, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 4, size: 2, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 5, size: 2, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 6, size: 2, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 7, size: 1, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 8, size: 1, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 9, size: 1, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
    { id: 10, size: 1, positions: [], placed: false, orientation: "horizontal", headX: null, headY: null },
  ]);
  // const [game, setGame] = useState(false);

  const createEmptyBoard = () => Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [botBoard, setBotBoard] = useState(createEmptyBoard());

  const handleDragStart = (e, ship) => {
    e.dataTransfer.setData("ship", JSON.stringify(ship));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, x, y) => {
    e.preventDefault();
    const shipData = e.dataTransfer.getData("ship");

    if (!shipData) {
      console.error("Данные о корабле отсутствуют!");
      return;
    }

    try {
      const ship = JSON.parse(shipData);
      placeShip(ship, x, y);
    } catch (error) {
      console.error("Ошибка при разборе данных корабля:", error);
    }
  };

  const placeShip = (ship, startX, startY) => {
    const newBoard = [...playerBoard];
    const positions = [];

    // Рассчитываем позиции корабля
    for (let i = 0; i < ship.size; i++) {
      const x = startX + (ship.orientation === "vertical" ? i : 0);
      const y = startY + (ship.orientation === "horizontal" ? i : 0);

      positions.push({ x, y });
    }

    // Проверяем, можно ли разместить корабль
    if (!isPlacementValid(positions)) {
      alert("Невозможно разместить корабль здесь!");
      return;
    }

    // Размещаем корабль на поле
    positions.forEach(({ x, y }) => {
      newBoard[x][y] = ship.id;
    });

    setPlayerBoard(newBoard);
    setShips((prevShips) =>
      prevShips.map((s) =>
        s.id === ship.id ? { ...s, positions, placed: true, headX: startX, headY: startY } : s
      )
    );
  };

  const rotateShip = (shipId) => {
    const updatedShips = ships.map((ship) => {
      if (ship.id === shipId && ship.placed) {
        const newOrientation = ship.orientation === "vertical" ? "horizontal" : "vertical";
        const newPositions = calculateNewPositions(ship, newOrientation);
        const tempBoard = [...playerBoard];
        ship.positions.forEach(({ x, y }) => {
          tempBoard[x][y] = null;
        });

        // Проверяем, можно ли разместить корабль в новой ориентации
        // Игнорируем проверку соседних клеток (ignoreNeighbors = true)
        if (isPlacementValid(newPositions, true)) {
          // Обновляем поле с новыми позициями корабля
          newPositions.forEach(({ x, y }) => {
            tempBoard[x][y] = ship.id;
          });

          setPlayerBoard(tempBoard); // Обновляем состояние поля
          return { ...ship, orientation: newOrientation, positions: newPositions };
        } else {
          // Если новые позиции невалидны, возвращаем старые позиции
          ship.positions.forEach(({ x, y }) => {
            tempBoard[x][y] = ship.id;
          });
          setPlayerBoard(tempBoard); // Восстанавливаем старое состояние поля
        }
      }
      return ship;
    })
    setShips(updatedShips)
  };



  const calculateNewPositions = (ship, newOrientation) => {
    const { headX, headY, size } = ship;
    const positions = [];
    for (let i = 0; i < size; i++) {
      if (newOrientation === "vertical") {
        positions.push({ x: headX + i, y: headY }); // Вертикальный корабль: увеличиваем x
      } else {
        positions.push({ x: headX, y: headY + i }); // Горизонтальный корабль: увеличиваем y
      }
    }
    return positions;
  };


  const isPlacementValid = (positions) => {
    for (const { x, y } of positions) {
      // Проверка, что клетка находится в пределах поля
      if (x >= 10 || y >= 10 || x < 0 || y < 0) {
        return false;
      }
  
      // Проверка, что клетка свободна
      if (playerBoard[x][y] !== null) {
        return false;
      }
  
      // Проверка всех соседних клеток (включая диагонали)
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
  
          // Пропускаем текущую клетку
          if (dx === 0 && dy === 0) continue;
  
          // Проверка, что соседняя клетка находится в пределах поля
          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            // Если соседняя клетка занята, возвращаем false
            if (playerBoard[nx][ny] !== null) {
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const handleCellClick = (x, y) => {
    const shipId = playerBoard[x][y];
    if (shipId) {
      rotateShip(shipId);
    }
  };

  return (
    <div className={styles.seaBattleContainer}>
      
      <GameBoard
        board={playerBoard}
        onCellClick={handleCellClick}
        onDrop={handleDrop}
        handleDragOver={handleDragOver}
        ships={ships}
      />
      <div style={{ position: 'relative' }}> 
        <GameBoard
          board={botBoard}
          onCellClick={handleCellClick}
          onDrop={handleDrop}
          handleDragOver={handleDragOver}
          ships={ships}
        />
        <div className={styles.shipsContainer}>
          {ships
            .filter((ship) => !ship.placed)
            .map((ship) => (
              <Ship
                key={ship.id}
                ship={ship}
                onDragStart={handleDragStart}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const Ship = ({ ship, onDragStart }) => {
  return (
    <div
      draggable={!ship.placed}
      onDragStart={(e) => onDragStart(e, ship)}
      style={{
        width: `${ship.size * 3}vw`,
        height: "3vw",
        margin: "2.2vw",
        cursor: ship.placed ? "not-allowed" : "grab",
      }}
    >
      <img src={`../img/${ship.size}.png`} alt="" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export function Cell({ x, y, value, onClick, onDrop, handleDragOver, ships }) {
  const ship = ships.find((s) => s.id === value); // Находим корабль по id
  const cellColor = value ? "darkgray" : "lightgray";

  return (
    <div
      className={styles.cell}
      onClick={() => onClick(x, y)} // Вызываем onClick
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, x, y)}
      style={{ backgroundColor: cellColor }}
    >
      {ship ? (
        <img
          src={`../img/${ship.size}.png`} // Путь к картинке корабля
          alt={`Корабль ${ship.size}`} // Альтернативный текст
          style={{
            width: "100%", // Ширина картинки
            height: "100%", // Высота картинки
            transform: ship.orientation === "vertical" ? "rotate(270deg)" : "none",
          }}
        />
      ) : null}
    </div>
  );
}