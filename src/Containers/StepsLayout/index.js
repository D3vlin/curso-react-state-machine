import React from 'react';
import { Welcome } from '../../Components/Welcome';
import { Search } from '../../Components/Search';
import { Passengers } from '../../Components/Passengers';
import { Tickets } from '../../Components/Tickets';
import './styles.css';

const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches('initial')) return <Welcome send={send} />
    if (state.matches('search')) return <Search state={state} send={send} />
    if (state.matches('tickets')) return <Tickets context={state.context} send={send} />
    if (state.matches('passengers')) return <Passengers state={state} send={send} />
    return <Welcome send={send} />;
  };

  return (
    <div className='StepsLayout'>
      {renderContent()}
    </div>
  );
}

export { StepsLayout }