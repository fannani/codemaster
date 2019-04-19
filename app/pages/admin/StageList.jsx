import React, { useState } from 'react';
import { Query } from 'react-apollo';
import Card from '../../components/UI/Card';
import { GET_COURSE_BYID } from '../../queries/courses';
import AdminCourseDetail from '../../components/admin/Course/Detail';
import AdminStageCreateModal from '../../components/admin/Stage/CreateModal';
import AdminStageDeleteModal from '../../components/admin/Stage/DeleteModal';
import AdminStageList from '../../components/admin/Stage/List';


const StageList = ({
  history,
  match: {
    params: { courseid },
  },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [delConfirm, setDelConfirm] = useState(false);
  const [delData, setDelData] = useState({});

  const createStage = () => {
    setShowModal(true);
  };

  const onSuccess = idp => {
    history.push(`/admin/stage/${idp}`);
  };

  const modalClosed = () => {
    setShowModal(false);
    setDelConfirm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <Query
          query={GET_COURSE_BYID}
          variables={{
            courseid,
          }}
        >
          {({ loading, error, data: { courses } }) => {
            if (loading) return <p>Loading…</p>;
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <main className="col-12 main-container">
                <AdminCourseDetail courses={courses[0]} />
                <Card className="card" style={{ marginTop: '20px' }}>
                  <div className="card-body">
                    <AdminStageList
                      onCreate={createStage}
                      stages={courses[0].stages}
                      courseid={courseid}
                      onDelete={stage => {
                        setDelConfirm(true);
                        setDelData(stage);
                      }}
                    />

                    <AdminStageCreateModal
                      show={showModal}
                      courseid={courseid}
                      onClose={modalClosed}
                      onSuccess={onSuccess}
                    />
                    <AdminStageDeleteModal
                      show={delConfirm}
                      onClose={modalClosed}
                      data={delData}
                    />
                  </div>
                </Card>
              </main>
            );
          }}
        </Query>
      </div>
    </div>
  );
};

export default StageList;
