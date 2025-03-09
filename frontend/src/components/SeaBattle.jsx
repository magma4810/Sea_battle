import { GameBoard } from "./GameBoard";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import * as styles from "../styles/SeaBattle.module.css";
import Cookies from 'js-cookie';

export default function SeaBattle() {
  const ships = [
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
  ];

  const [shipsPlayer, setShipsPlayer] = useState([...ships]);
  const [shipsBot, setShipsBot] = useState([...ships]);
  const [botShots, setBotShots] = useState([]);
  const [playerShots, setPlayerShots] = useState([]);
  const [lastHit, setLastHit] = useState(null);
  const [botShouldShootAgain, setBotShouldShootAgain] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [showBotShips, setShowBotShips] = useState(false);

  const createEmptyBoard = () => Array(10).fill().map(() => Array(10).fill(null));

  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  const [botBoard, setBotBoard] = useState(createEmptyBoard());
  const [allShipsPlaced, setAllShipsPlaced] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (gameIsRunning && !isGameOver(shipsPlayer, playerShots) && !isGameOver(shipsBot, botShots)) {
        localStorage.setItem("gameInterrupted", "true");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameIsRunning, shipsPlayer, shipsBot, playerShots, botShots]);

  useEffect(() => {
    let isMounted = true; 
    const nickname = Cookies.get('nickname');
    fetch(`/api/getStatUserByNickname/${nickname}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!isMounted) return; 
  
        setData(data[0]);
  
        const gameInterrupted = localStorage.getItem("gameInterrupted");
        if (gameInterrupted === "true") {
  
          fetch(`/api/updateDefeatAndWinrate/${nickname}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              games: data[0].games + 1,
              defeat: data[0].defeat + 1,
              winrate: 100 - ((data[0].defeat + 1) / (data[0].games + 1) * 100),
            }),
          })
            .then(response => response.json())
            .then(() => {
              if (!isMounted) return; // Если компонент размонтирован, прекращаем выполнение
              console.log('Статистика успешно обновлена');
              localStorage.removeItem("gameInterrupted"); // Очищаем флаг
              alert("Игра была прервана! Вы проиграли.");
            })
            .catch(error => {
              if (!isMounted) return; // Если компонент размонтирован, прекращаем выполнение
              console.error('Ошибка при обновлении статистики:', error);
            });
        }
      })
      .catch(error => {
        if (!isMounted) return; // Если компонент размонтирован, прекращаем выполнение
        console.error('Ошибка при получении статистики пользователя:', error);
      });
  
    return () => {
      isMounted = false; // Очистка при размонтировании компонента
    };
  }, []);

  useEffect(() => {
    if (gameIsRunning) {
      const timer = setTimeout(() => {
        botShoot();
      }, 500); // Задержка перед следующим выстрелом (можно настроить)
      return () => clearTimeout(timer); // Очистка таймера
    }
  }, [botShouldShootAgain]);

  useEffect(() => {
    const playerWin = isGameOver(shipsBot, botShots);
    const botWin = isGameOver(shipsPlayer, playerShots);
  
    if ((playerWin || botWin) && gameIsRunning) {
      const nickname = Cookies.get('nickname');
  
      // Получаем данные пользователя
      
  
          // Подсчет уничтоженных кораблей
          const destroyedShips = countDestroyedShips(playerShots);
  
          // Обновляем статистику
          const updatedStats = {
            games: data.games + 1,
            winrate: playerWin 
              ? ((data.wins + 1) / (data.games + 1) * 100)
              : 100 - ((data.defeat + 1) / (data.games + 1) * 100),
            wins: data.wins + (playerWin ? 1 : 0),
            draw: data.draw,
            defeat: data.defeat + (playerWin ? 0 : 1),
            singleDeck: data.singleDeck + destroyedShips.singleDeck,
            doubleDecker: data.doubleDecker + destroyedShips.doubleDecker,
            threeDeck: data.threeDeck + destroyedShips.threeDeck,
            fourDeck: data.fourDeck + destroyedShips.fourDeck,
            shipsDestroyed: data.shipsDestroyed + destroyedShips.singleDeck 
              + destroyedShips.doubleDecker + destroyedShips.threeDeck + destroyedShips.fourDeck,
          };
  
          // Отправляем обновленную статистику на сервер
          fetch(`/api/updateStatUserByNickname/${nickname}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedStats),
          })
            .then(response => response.json())
            .then(() => {
              console.log('Статистика успешно обновлена');
            })
            .catch(error => {
              console.error('Ошибка при обновлении статистики:', error);
            });
  
          setGameIsRunning(false);
          update();

    }
  }, [botShots, playerShots, gameIsRunning]);

  const countDestroyedShips = (shots) => {
    const destroyedShips = {
      singleDeck: 0,
      doubleDecker: 0,
      threeDeck: 0,
      fourDeck: 0,
    };
  
    ships.forEach((ship) => {
      if (isShipDestroyed(ship, shots)) {
        switch (ship.size) {
          case 1:
            destroyedShips.singleDeck += 1;
            break;
          case 2:
            destroyedShips.doubleDecker += 1;
            break;
          case 3:
            destroyedShips.threeDeck += 1;
            break;
          case 4:
            destroyedShips.fourDeck += 1;
            break;
          default:
            break;
        }
      }
    });
  
    return destroyedShips;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Проверяем, нажаты ли Ctrl + l
      if (event.ctrlKey && event.key === 'l') {
        event.preventDefault(); // Предотвращаем стандартное поведение (например, сохранение страницы)
        setShowBotShips((prev) => !prev); // Переключаем видимость кораблей бота
      }
    };

    // Добавляем обработчик события
    window.addEventListener('keydown', handleKeyDown);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    if (!isPlacementValid(positions, playerBoard)) {
      alert("Невозможно разместить корабль здесь!");
      return;
    }

    // Размещаем корабль на поле
    positions.forEach(({ x, y }) => {
      newBoard[x][y] = ship.id;
    });

    setPlayerBoard(newBoard);
    setShipsPlayer((prevShips) =>
      prevShips.map((s) =>
        s.id === ship.id ? { ...s, positions, placed: true, headX: startX, headY: startY } : s
      )
    );
    const allPlaced = shipsPlayer.every((s) => s.placed);
    setAllShipsPlaced(allPlaced);
  };

  const autoPlaceShips = (switchBoard) => {
    const newBoard = createEmptyBoard(); // Создаем пустое поле
    const updatedShips = [...ships]; // Копируем массив кораблей

    // Сбрасываем все корабли
    updatedShips.forEach((ship) => {
      ship.positions = [];
      ship.placed = false;
      ship.headX = null;
      ship.headY = null;
    });

    // Функция для случайного размещения одного корабля
    const placeSingleShip = (ship) => {
      let placed = false;
      while (!placed) {
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"; // Случайная ориентация
        const startX = Math.floor(Math.random() * 10); // Случайная начальная позиция X
        const startY = Math.floor(Math.random() * 10); // Случайная начальная позиция Y

        // Рассчитываем позиции корабля
        const positions = [];
        for (let i = 0; i < ship.size; i++) {
          const x = startX + (orientation === "vertical" ? i : 0);
          const y = startY + (orientation === "horizontal" ? i : 0);
          positions.push({ x, y });
        }

        // Проверяем, можно ли разместить корабль
        if (isPlacementValid(positions, newBoard)) {
          // Размещаем корабль на поле
          positions.forEach(({ x, y }) => {
            newBoard[x][y] = ship.id;
          });

          // Обновляем данные корабля
          ship.positions = positions;
          ship.placed = true;
          ship.orientation = orientation;
          ship.headX = startX;
          ship.headY = startY;
          placed = true;
        }
      }
    };

    // Размещаем все корабли
    updatedShips.forEach((ship) => {
      placeSingleShip(ship);
    });

    // Обновляем состояние
    if (switchBoard === 'player') {
      setPlayerBoard(newBoard);
      setShipsPlayer(updatedShips);
    } else {
      setBotBoard(newBoard);
      setShipsBot(updatedShips);
    }

  };

  const rotateShip = (shipId) => {
    if (!allShipsPlaced) {
      const updatedShips = shipsPlayer.map((ship) => {
        if (ship.id === shipId && ship.placed) {
          const newOrientation = ship.orientation === "vertical" ? "horizontal" : "vertical";
          const newPositions = calculateNewPositions(ship, newOrientation);
          const tempBoard = [...playerBoard];
          ship.positions.forEach(({ x, y }) => {
            tempBoard[x][y] = null;
          });

          // Проверяем, можно ли разместить корабль в новой ориентации
          // Игнорируем проверку соседних клеток (ignoreNeighbors = true)
          if (isPlacementValid(newPositions, playerBoard)) {
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
      setShipsPlayer(updatedShips)
    }
  };

  const isShipDestroyed = (ship, shots) => {
    return ship.positions.every((pos) =>
      shots.some((shot) => shot.x === pos.x && shot.y === pos.y && shot.hit)
    );
  };

  const getSurroundingCells = (positions) => {
    const surroundingCells = new Set();

    positions.forEach(({ x, y }) => {
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;

          // Пропускаем клетки за пределами поля
          if (nx < 0 || nx >= 10 || ny < 0 || ny >= 10) continue;

          // Пропускаем клетки самого корабля
          if (positions.some((pos) => pos.x === nx && pos.y === ny)) continue;

          // Добавляем клетку в Set
          surroundingCells.add(`${nx}-${ny}`);
        }
      }
    });

    // Преобразуем Set в массив объектов { x, y }
    return Array.from(surroundingCells).map((cell) => {
      const [x, y] = cell.split("-").map(Number);
      return { x, y };
    });
  };

  const handleBotCellClick = (x, y) => {
    if (!isPlayerTurn) {
      alert("Сейчас ход бота!");
      return;
    }
    const alreadyShot = botShots.some((shot) => shot.x === x && shot.y === y);
    if (alreadyShot) {
      alert("Вы уже стреляли в эту клетку!");
      return;
    }

    const isHit = botBoard[x][y] !== null;

    // Добавляем новый выстрел
    const newShot = { x, y, hit: isHit };
    const updatedBotShots = [...botShots, newShot];
    setBotShots(updatedBotShots);

    // Если попали, проверяем, уничтожен ли корабль
    if (isHit) {
      const hitShip = shipsBot.find((ship) => ship.id === botBoard[x][y]);
      if (isShipDestroyed(hitShip, updatedBotShots)) {
        // Находим клетки вокруг корабля
        const surroundingCells = getSurroundingCells(hitShip.positions);

        // Добавляем промахи вокруг корабля
        const newMisses = surroundingCells.map((cell) => ({
          x: cell.x,
          y: cell.y,
          hit: false,
        }));

        setBotShots((prevShots) => [...prevShots, ...newMisses]);
      }
    } else {
      setIsPlayerTurn(false);
      if (gameIsRunning) {
        setTimeout(() => {
          botShoot();
        }, 500); // Задержка перед следующим выстрелом (можно настроить)
        // return () => clearTimeout(timer); // Очистка таймера
      }
    }


    // Проверяем, закончилась ли игра
  };

  const botShoot = () => {
    let x, y;

    // Если есть последнее попадание, стреляем в соседние клетки
    if (lastHit) {
      const directions = [
        { dx: 1, dy: 0 },  // вниз
        { dx: -1, dy: 0 }, // вверх
        { dx: 0, dy: 1 },  // вправо
        { dx: 0, dy: -1 }, // влево
      ];

      // Пробуем стрелять в соседние клетки
      for (const { dx, dy } of directions) {
        x = lastHit.x + dx;
        y = lastHit.y + dy;

        // Проверяем, что клетка в пределах поля и в нее еще не стреляли
        if (
          x >= 0 && x < 10 &&
          y >= 0 && y < 10 &&
          !playerShots.some((shot) => shot.x === x && shot.y === y)
        ) {
          break; // Нашли подходящую клетку
        }
      }
    }

    // Если lastHit === null или не удалось найти соседнюю клетку, стреляем случайно
    if (!lastHit || playerShots.some((shot) => shot.x === x && shot.y === y)) {
      let attempts = 0;
      const maxAttempts = 100;

      do {
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        attempts++;
      } while (
        playerShots.some((shot) => shot.x === x && shot.y === y) &&
        attempts < maxAttempts
      );

      if (attempts >= maxAttempts) {
        console.error("Бот не смог найти клетку для выстрела!");
        return;
      }
    }

    // Проверяем, попал ли бот в корабль
    const isHit = playerBoard[x][y] !== null;

    // Добавляем новый выстрел
    const newShot = { x, y, hit: isHit };
    const updatedPlayerShots = [...playerShots, newShot];
    setPlayerShots(updatedPlayerShots);

    // Если попал, обновляем lastHit
    if (isHit) {
      setLastHit({ x, y });

      // Проверяем, уничтожен ли корабль
      const hitShip = shipsPlayer.find((ship) => ship.id === playerBoard[x][y]);
      if (hitShip && isShipDestroyed(hitShip, updatedPlayerShots)) {
        // Корабль уничтожен, сбрасываем lastHit
        setLastHit(null);

        // Добавляем промахи вокруг корабля
        const surroundingCells = getSurroundingCells(hitShip.positions);
        const newMisses = surroundingCells.map((cell) => ({
          x: cell.x,
          y: cell.y,
          hit: false,
        }));
        setPlayerShots((prevShots) => [...prevShots, ...newMisses]);
      }

      // Указываем, что бот должен сделать еще один выстрел
      setBotShouldShootAgain(!botShouldShootAgain);
    } else {
      // Если бот промахнулся, ход переходит к игроку
      console.log("Бот промахнулся!");
      setIsPlayerTurn(true); // Разблокируем ход игрока

    }
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


  const isPlacementValid = (positions, board) => {
    for (const { x, y } of positions) {
      // Проверка, что клетка находится в пределах поля
      if (x >= 10 || y >= 10 || x < 0 || y < 0) {
        return false;
      }

      // Проверка, что клетка свободна
      if (board[x][y] !== null) {
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
            if (board[nx][ny] !== null) {
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

  const resetShips = () => {
    setShipsPlayer((prevShips) =>
      prevShips.map((ship) => ({
        ...ship,
        positions: [],
        orientation: "horizontal",
        placed: false,
        headX: null,
        headY: null,
      }))
    );
    setPlayerBoard(createEmptyBoard());
    setAllShipsPlaced(false);
  };

  const update = () => {
    // Сброс кораблей игрока и бота
    setShipsPlayer([...ships]);
    setShipsBot([...ships]);

    // Сброс выстрелов игрока и бота
    setPlayerShots([]);
    setBotShots([]);

    // Сброс последнего попадания и флага для выстрела бота
    setLastHit(null);
    setBotShouldShootAgain(false);

    // Сброс хода игрока и состояния игры
    setIsPlayerTurn(true);
    setGameIsRunning(false);

    // Сброс видимости кораблей бота
    setShowBotShips(false);

    // Сброс полей игрока и бота
    setPlayerBoard(createEmptyBoard());
    setBotBoard(createEmptyBoard());

    // Сброс флага размещения кораблей
    setAllShipsPlaced(false);

    localStorage.removeItem("gameInterrupted");
  };

  const isGameOver = (ships, shots) => {
    return ships.every((ship) =>
      ship.positions.every((pos) =>
        shots.some((shot) => shot.x === pos.x && shot.y === pos.y && shot.hit)
      )
    );
  };

  const start = () => {
    if (shipsPlayer.every((ship) => ship.placed)) {
      setAllShipsPlaced(true);
      autoPlaceShips('bot');
      setGameIsRunning(true);
    } else {
      alert("Расставьте все корабли перед началом игры!");
    }
  }

  return (
    <div className={styles.seaBattleContainer}>

      <GameBoard
        board={playerBoard}
        onCellClick={handleCellClick}
        onDrop={handleDrop}
        handleDragOver={handleDragOver}
        ships={shipsPlayer}
        shots={playerShots}
        isBotBoard={false}
        showBotShips={showBotShips}
      />

      <div style={{ position: 'relative' }}>
        <GameBoard
          board={botBoard}
          onCellClick={handleBotCellClick} // Обработчик выстрелов
          onDrop={() => { }}
          handleDragOver={() => { }}
          ships={shipsBot}
          shots={botShots} // Передаем выстрелы
          isBotBoard={true}
          showBotShips={showBotShips}
        />
        {(!allShipsPlaced &&
          <div className={styles.shipsContainer}>
            <div className={styles.ships}>
              {shipsPlayer
                .filter((ship) => !ship.placed)
                .map((ship) => (
                  <Ship
                    key={ship.id}
                    ship={ship}
                    onDragStart={handleDragStart}
                  />
                ))}

            </div>
            <div className={styles.buttonsContainer}>
              <Button onClick={resetShips} title={"Сбросить корабли"} />
              <Button onClick={() => autoPlaceShips('player')} title={"Авторазмещение"} />
              <Button onClick={() => start()} title={"Старт"} />
            </div>
          </div>
        )}
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
        margin: "1.2vw",
        cursor: ship.placed ? "not-allowed" : "grab",
      }}
    >
      <img src={`../img/${ship.size}.png`} alt="" style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export function Cell({ x, y, value, onClick, onDrop, handleDragOver, ships, shots, isBotBoard, showBotShips }) {
  const ship = ships.find((s) => s.id === value); // Находим корабль по id
  const cellColor = value ? "darkgray" : "lightgray";

  // Проверяем, был ли выстрел в эту ячейку
  const shot = shots.find((shot) => shot.x === x && shot.y === y);
  const isHit = shot ? shot.hit : false;

  // Проверяем, уничтожен ли корабль
  const isShipDestroyed = ship && ship.positions.every((pos) =>
    shots.some((shot) => shot.x === pos.x && shot.y === pos.y && shot.hit)
  );

  // Определяем, нужно ли отображать корабль
  const showShip = (isBotBoard && (showBotShips || isShipDestroyed)) || (!isBotBoard && ship); // Показываем корабль на поле бота, если showBotShips === true или корабль уничтожен

  return (
    <div
      className={styles.cell}
      onClick={() => onClick(x, y)} // Вызываем onClick
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, x, y)}
      style={showShip ? { backgroundColor: cellColor } : null}
    >
      {showShip && ship && ( // Проверяем, что ship существует
        <img
          src={`../img/${ship.size}.png`} // Путь к картинке корабля
          alt={`Корабль ${ship.size}`} // Альтернативный текст
          style={{
            width: "100%", // Ширина картинки
            height: "100%", // Высота картинки
            transform: ship.orientation === "vertical" ? "rotate(270deg)" : "none",
          }}
        />
      )}

      {/* Отображаем крестик, если был выстрел и попадание */}
      {shot ? isHit ? (
        <div style={{ fontSize: "24px", color: "red", position: "absolute" }}>
          ✕
        </div>
      ) : (
        <div style={{ color: "black", fontWeight: "900", fontSize: "5vw", marginBottom: "2vw" }}>
          .
        </div>
      ) : null}
    </div>
  );
}