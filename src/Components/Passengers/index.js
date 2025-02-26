import React, { useState } from 'react';
import './styles.css';

const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    send({ type: 'ADD', newPassengers: value })
    changeValue('');
  }

  const goToTicket = () => {
    send({ type: 'DONE' })
  }

  const { passengers } = state.context

  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
      {passengers.map((passanger, index) => <p className='text' key={index}>{passanger}</p>)}
      <input
        id="name"
        name="name"
        type="text"
        placeholder='Escribe el nombre completo'
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTicket}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
}

export { Passengers }