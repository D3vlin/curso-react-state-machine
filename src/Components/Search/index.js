import React, { useState } from 'react';
import './styles.css';

const Search = ({ send }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const options = ['Mexico', 'Venezuela', 'Colombia'];

  const goToPassengers = () => {
    send({ type: 'CONTINUE', selectedCountry: flight})
}

return (
  <div className='Search'>
    <p className='Search-title title'>Busca tu destino</p>
    <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
      <option value="" disabled defaultValue>Escoge un país</option>
      {options.map((option) => <option value={option} key={option}>{option}</option>)}
    </select>
    <button disabled={flight === ''} className='Search-continue button' onClick={goToPassengers}>Continuar</button>
  </div>
);
}

export { Search }