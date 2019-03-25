import { useEffect, useContext } from 'react';
import AppContext from '../utils/context';

const AppPersist = ({ children }) => {
  const [state] = useContext(AppContext);

  const saveStateToLocalStorage = () => {
    localStorage.setItem('app:persist', JSON.stringify(state));
  };

  useEffect(
    () => {
      saveStateToLocalStorage();
    },
    [state],
  );

  return children;
};

export default AppPersist;
