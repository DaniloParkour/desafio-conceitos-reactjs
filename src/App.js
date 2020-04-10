import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const resp = await api.post('repositories', {
      id: `${Date.now()}`,
      title: newRepository,// `Novo Repositorio ${Date.now()}`,
      url: 'url-teste',
      techs: [ 'TesteTechs', 'TechsTeste']
    });

    const repo = resp.data;
    setRepositories([...repositories, repo]);

    setNewRepository('');
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204) {
      setRepositories(repositories.filter((repository) => (repository.id !== id)));
    }
    
  }

  const handleChange = (event) => {
    setNewRepository(event.target.value);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}              
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }

      </ul>

      <div>
        <input placeholder="Novo repositório" value={newRepository} onChange={handleChange} />
        {" => "}
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
      
    </div>
  );
}

export default App;
