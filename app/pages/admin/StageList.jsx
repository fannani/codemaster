import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import { GET_COURSE_BYID } from '../../queries/courses';
import { REORDER_STAGE } from '../../queries/stages';
import AdminCourseDetail from '../../components/admin/Course/Detail';
import AdminStageCreateModal from '../../components/admin/Stage/CreateModal';
import AdminStageDeleteModal from '../../components/admin/Stage/DeleteModal';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import 'brace/mode/html';
import 'brace/theme/tomorrow';

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
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">Stage List</h5>
                      <button
                        type="button"
                        onClick={createStage}
                        className="btn btn-primary"
                      >
                        Add Stage
                      </button>
                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>
                      <div className="col-12">
                        <Mutation mutation={REORDER_STAGE}>
                          {reorderStage => (
                            <DragDropContext
                              onDragEnd={result => {
                                const {
                                  destination,
                                  source,
                                  draggableId,
                                } = result;
                                if (!destination) {
                                  return;
                                }
                                if (
                                  destination.droppableId ===
                                    source.droppableId &&
                                  destination.index === source.index
                                ) {
                                  return;
                                }
                                reorderStage({
                                  variables: {
                                    courseid,
                                    source: source.index + 1,
                                    destination: destination.index + 1,
                                  },
                                });
                                console.log(source, destination);
                                // const column =
                              }}
                            >
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th width="80%">TITLE</th>
                                    <th width="20%"> ACTION</th>
                                  </tr>
                                </thead>
                                <Droppable droppableId="droppable">
                                  {provided => (
                                    <tbody
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                    >
                                      {courses[0].stages.map(stage => (
                                        <Draggable
                                          key={stage._id}
                                          draggableId={stage._id}
                                          index={stage.index - 1}
                                        >
                                          {provided => (
                                            <tr
                                              key={stage._id}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                            >
                                              <td width="80%">{stage.title}</td>
                                              <td width="20%">
                                                <Link
                                                  to={`/admin/stage/${
                                                    stage._id
                                                  }`}
                                                  className="btn"
                                                >
                                                  Detail
                                                </Link>
                                                <button
                                                  type="button"
                                                  className="btn btn-danger"
                                                  onClick={() => {
                                                    setDelConfirm(true);
                                                    setDelData(stage);
                                                  }}
                                                >
                                                  Delete
                                                </button>
                                              </td>
                                            </tr>
                                          )}
                                        </Draggable>
                                      ))}
                                      {provided.placeholder}
                                    </tbody>
                                  )}
                                </Droppable>
                              </table>
                            </DragDropContext>
                          )}
                        </Mutation>
                      </div>
                    </div>

                    <AdminStageCreateModal
                      show={showModal}
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
