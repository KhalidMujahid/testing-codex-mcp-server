const { useEffect, useState } = React;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Loading users...');

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Unable to fetch users');
      }

      const data = await response.json();
      setUsers(data);
      setStatus('Users loaded');
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const createUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to create user');
      }

      setName('');
      setEmail('');
      setStatus('User created');
      setUsers((currentUsers) => [data, ...currentUsers]);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Unable to delete user');
      }

      setUsers((currentUsers) => currentUsers.filter((user) => user._id !== id));
      setStatus('User deleted');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <main className="container">
      <h1>React + Express User Manager</h1>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      <p className="status">{status}</p>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <div>
              <strong>{user.name}</strong>
              <div className="meta">{user.email}</div>
            </div>
            <button className="delete" type="button" onClick={() => deleteUser(user._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
