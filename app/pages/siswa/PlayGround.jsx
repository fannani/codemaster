import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Query } from 'react-apollo';
import { GET_COURSE_BYID } from '../../queries/courses';
import Card from '../../components/UI/Card';
import { Link } from 'react-router-dom';

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

class PlayGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(10),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {}

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <Query
        query={GET_COURSE_BYID}
        variables={{
          courseid: '5c1fa527556b9635681eb2da',
        }}
      >
        {({ loading, error, data: { courses } }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Sorry! There was an error loading the items</p>;
          return (
            <>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>TITLE</th>
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
                            index={stage.index}
                          >
                            {provided => (
                              <tr
                                key={stage._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <td>{stage.title}</td>
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

              <DragDropContext onDragEnd={this.onDragEnd}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>TITLE</th>
                    </tr>
                  </thead>

                  <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                      <tbody
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                      {courses[0].stages.map(stage => (
                          <Draggable
                            key={stage._id}
                            draggableId={stage._id}
                            index={stage.index}
                          >
                            {(provided, snapshot) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <td>{stage.title}</td>
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
            </>
          );
        }}
      </Query>
    );
  }
}

export default PlayGround;
