import React from 'react';
import './styles.css';

const Tickets = ({ send, context }) => {
  const finish = () => {
    send({ type: 'FINISH' })
  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>{context.selectedCountry}</div>
        <div className='Tickets-passengers'>
          <span>✈</span>
          {context.passengers.map((passenger, index) => <p key={index}>{passenger}</p>)}
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}

export { Tickets }