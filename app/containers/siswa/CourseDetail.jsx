/* eslint-disable */
import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import { stagesFetchData, getStageByIdCourse } from '../../actions/stages';

class CourseDetail extends Component {
  componentDidMount() {
    this.props.getStageByIdCourse(this.props.match.params.courseid);
  }

  render() {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <p>Loading…</p>;
    }
    return (
      <div>
      <div className="row">
        <h2>JUDUL COURSE</h2>
      </div>
      <div className="row">
        <div className="col-8">
          <div className="card" >
            <div className="card-body">

              <ul>
                {this.props.stages.map(item => (
                  <li key={item._id}>
                    <Link to={`/play/${item._id}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row">
          <div className="card" style={{"width" : "100%"}} >
            <div className="card-body">
              <h5 className="card-title">Daily Target</h5>

            </div>
          </div>
          </div>
          <div className="row" style={{'marginTop' : '10px'}}>
            <div className="card" style={{"width" : "100%"}}>
              <div className="card-body">
                <h5 className="card-title">Leaderboard</h5>

              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  stages: state.stages.stages,
  hasErrored: state.stages.hasErrored,
  isLoading: state.stages.isLoading,
});
const mapDispatchToProps = dispatch => ({
  fetchData: id => dispatch(stagesFetchData(id)),
  getStageByIdCourse: courseid => dispatch(getStageByIdCourse(courseid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseDetail);
