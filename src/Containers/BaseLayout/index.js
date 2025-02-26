import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../../Components/Nav';
import { StepsLayout } from '../StepsLayout';
import { bookingMachine } from '../../Machines/bookingMachine';
import './styles.css';

const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log('State: ', state.value, ', Context: ', state.context);

  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send} />
    </div>
  );
}

export { BaseLayout }