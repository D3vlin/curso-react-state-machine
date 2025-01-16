import React from 'react';
import './styles.css';

const Nav = ({ state, send }) => {
  const goToWelcome = () => {
    send({ type: 'CANCEL' })
  }

  return (
    <nav className='Nav'>
      <h1 className='Nav-logo'>Book a fly ✈</h1>
      {(!state.matches('initial') && !state.matches('tickets')) &&
        <button className='Nav-cancel button-secondary' onClick={goToWelcome}>Cancelar</button>
      }
    </nav>
  );
};

export { Nav }