import { useState } from 'react'
import logo from './assets/logo.png'
import './App.css'

function App() {
  const [dataNascimento, setdataNascimento] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState(null);

  const calculateidade = () => {
    if (!nome || !dataNascimento) { // Se o nome ou data de nascimento não forem preenchidos
      alert('Por favor, insira seu nome e sua data de nascimento.');
      return;
    }

    const dataNascimentoObj = new Date(dataNascimento); //  Data de nascimento fornecida pelo usuário, agora no formato de objeto 'Date'
    const dataAtual = new Date(); // Pega a data atual

    if (dataNascimentoObj >= dataAtual) { // Se data atual for maior ou igual à atual
      alert('A data de nascimento não pode ser no futuro.');
      return;
    }

    const idadeMilissegundos = dataAtual - dataNascimentoObj; // calcula o tempo de vida
    const idadeAnos = Math.floor(idadeMilissegundos / (365 * 24 * 60 * 60 * 1000)); // Converte para anos
    /*
      | 365 é o número de dias em um ano.
      | 24 é o número de horas em um dia.
      | 60 é o número de minutos em uma hora.
      | 60 é o número de segundos em um minuto.
      | 1000 é o número de milissegundos em um segundo. 
      <!--Portanto, multiplicando todas essas partes, teremos o número de milissegundos em um ano.-->
    */
    setIdade(idadeAnos); 
  };

  return (
    <div className='principal'>
      <div className='logo'>
            <img src={logo} alt="React logo" />
      </div>
      <div className='informacoes'>
        <h1>Descubra sua idade!</h1>
        <label>Nome completo:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)} // Evento que atribui o nome incerido para o 'setNome'
        />
        <label>Data de Nascimento:</label>
        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setdataNascimento(e.target.value)} // Evento que atribui o data incerida para o 'setdataNascimento'
        />
        <button onClick={calculateidade}>Calcular Idade</button>
        {idade !== null && <p>{nome}, sua idade é: {idade} anos</p>}
      </div>
    </div>
  );
}

export default App;


// lissandra.fischer@ifc.edu.br
