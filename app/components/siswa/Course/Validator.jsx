import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { postLog } from '../../../utils/logs';
import { compareResult } from '../../../utils/course';
import usePlayer from '../../../hooks/player';

const SiswaCourseValidator = ({ children, stages, gameOver }) => {
  const [result, setResult] = useState([]);
  const player = usePlayer();
  const scorePoint = 20;
  let life = 3;

  const handleIframeTask = e => {
    const passData = e.data;
    let score = 0;
    if (passData.action === 'result') {
      const compare = compareResult(result, passData.data);
      setResult(compare.result);
      score = compare.all * scorePoint;

      if (compare.last < stages[0].missions.length) {
        if (compare.last > 0) {
          postLog('misi', 'berhasil menyelesaikan misi', compare.last);
          toast.success(`Anda berhasil menyelesaikan ${compare.last} misi`, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else if (life === 1) {
          life -= 1;
          gameOver(stages[0], score, life);
        } else {
          toast.error('Tidak ada jawaban yang benar', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          life -= 1;
        }
      }
      player.setPlayerStatus(score, life);
      if (compare.all >= stages[0].missions.length)
        gameOver(stages[0], score, life);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleIframeTask);
    return () => {
      window.removeEventListener('message', handleIframeTask);
    };
  }, []);
  return children({ result });
};

export default SiswaCourseValidator;
