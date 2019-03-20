import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import connect from 'react-redux/es/connect/connect';
import { postLog } from '../../utils/Logs';
import { compareResult } from '../../utils/CourseUtil';
import { setPlayerStatus as setPlayerStatusAction } from '../../actions/gameplay';

const CourseValidator = ({ children, stages, gameOver, setPlayerStatus }) => {
  const [result, setResult] = useState([]);
  const scorePoint = 20;
  let life = 3;

  const handleIframeTask = e => {
    const passData = e.data;
    let score = 0;
    if (passData.action === 'result') {
      const compare = compareResult(result, passData.data);
      setResult(compare.result);
      score = compare.all * scorePoint;
      setPlayerStatus(score, life);
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
      if (compare.all >= stages[0].missions.length)
        gameOver(stages[0], score, life);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleIframeTask);
  }, []);
  return children({ result });
};

const mapDispatchToProps = dispatch => ({
  setPlayerStatus: (score, life) =>
    dispatch(setPlayerStatusAction(score, life)),
});

const mapStateToProps = state => ({
  life: state.gameplay.life,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseValidator);
