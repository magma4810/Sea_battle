import { useEffect, useState } from "react";

function Example(){
    const [users, setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
    } catch (error) {
      console.error("Ошибка при добавлении пользователя:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchUsers();
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
    }
  };
    return (
        <div>
        {users.map(user => (
          <div key={user.id}>
            {user.name}
            <button onClick={() => updateUser({ id: user.id, name: user.name + ' (обновлено)' })}>
              Изменить
            </button>
            <button onClick={() => deleteUser(user.id)}>
              Удалить
            </button>
          </div>
        ))}
        <button onClick={() => addUser({ name: 'Новый пользователь' })}>
          Добавить пользователя
        </button>
      </div>
    )
}