import React, { useState } from 'react';
import TestCaseMissionModal from '../../components/admin/TestCaseMissionModal';
import ChooseTestCaseModal from '../../components/admin/ChooseTestCaseModal';
import TestCaseMissionList from '../../components/admin/TestCaseMissionList';
import MissionForm from '../../components/admin/MissionForm';

const Mission = ({ match }) => {
  const { params } = match;
  const { missionid } = params;
  const [showModal, setShowModal] = useState(false);
  const [showModalTestCase, setShowModalTestCase] = useState(false);
  const [testCase, setTestCase] = useState({ caption: '', script: '' });

  const modalClosed = () => {
    setShowModal(false);
    setShowModalTestCase(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <main className="col-12 main-container">
          <MissionForm missionid={missionid} />
          <TestCaseMissionList
            onCreate={() => {
              setShowModal(true);
            }}
            missionid={missionid}
          />
        </main>
      </div>
      <ChooseTestCaseModal
        modalClosed={modalClosed}
        onChoose={testcase => {
          setTestCase(testcase);
          setShowModal(false);
          setShowModalTestCase(true);
        }}
        show={showModal}
      />
      <TestCaseMissionModal
        modalClosed={modalClosed}
        missionid={missionid}
        show={showModalTestCase}
        testCase={testCase}
        onFinish={() => {
          setShowModalTestCase(false);
        }}
      />
    </div>
  );
};

export default Mission;
