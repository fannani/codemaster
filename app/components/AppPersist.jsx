import usePlayer from '../hooks/player';
const AppPersist = ({ children }) => {
  const player = usePlayer();
  console.log(player);
  if (player.loadingLocal) {
    return children;
  } else {
    return '';
  }
};

export default AppPersist;
