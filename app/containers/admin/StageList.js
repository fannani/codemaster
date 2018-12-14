import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Modal from "react-bootstrap4-modal";
import {addStage} from "../../actions/stages";
import connect from "react-redux/es/connect/connect";

class StageList extends Component {
    constructor(props){
        super(props);
        this.addStage = this.addStage.bind(this);
        this.saveStage = this.saveStage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
        this.state = {
            id : "",
            redirect : false,
            title: "",
            showModal : false,
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect push  to={"/admin/stage/"+this.state.id} />;
        }
        return (
            <div>
                <button onClick={this.addStage} className="btn btn-primary">Tambah Stage</button>
                <Modal visible={this.state.showModal} onClickBackdrop={this.modalClosed}>
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Course</h5>
                    </div>
                    <div className="modal-body">
                        <div className="card-body">
                            <input type="text" value={this.state.title} onChange={this.handleInputChange} placeholder="judul" name="title"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={this.saveStage} className="btn btn-primary">
                            Tambah
                        </button>
                        <button type="button" onClick={this.modalClosed}  className="btn btn-secondary">
                            Close
                        </button>

                    </div>
                </Modal>
            </div>
        );
    }
    addStage(){
        this.setState({
            showModal:true
        })
    }
    saveStage(){
        this.props.add(this.state.title,"",this.props.match.params.courseid,"").then((stage)=>{
            this.setState({
                id : stage._id,
                redirect: true
            })
        })
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })

    }
    modalClosed(){
        this.setState({
            showModal:false
        })
    }

}
const mapStateToProps = (state) => {
    let data = state.stages;
    return {
        hasErrored: state.stages.hasErrored,
        isLoading: state.stages.isLoading,
        isFinish: state.stages.isFinish
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        add: (title,time,course,teory) => dispatch(addStage(title,time,course,teory)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(StageList);
