import React, {Component} from 'react';
import {addStage,stageFetchOne,updateStage} from "../../actions/stages";
import connect from "react-redux/es/connect/connect";
import Modal from "react-bootstrap4-modal";

class Stage extends Component {
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveData = this.saveData.bind(this);
        this.state = {
            _id:"",
            title : "",
            teory : "",
            time : ""
        }
    }
    componentWillMount() {
        this.props.fetchOne(this.props.match.params.stageid).then((stage)=> {
            this.setState(stage)
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
    saveData(){
        const s = this.state;
        this.props.update(this.props.match.params.stageid,s.title,s.teory,s.time).then((data)=>{
         });
    }
    addMission(){

    }
    render() {
        return (
            <div>
                <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} placeholder="Judul"/><br/>
                <textarea name="teory" id="teory" cols="30" rows="10" onChange={this.handleInputChange} value={this.state.teory} placeholder="Teory" /><br/>
                <input type="text" name="time" onChange={this.handleInputChange} value={this.state.time} placeholder="Waktu"/><br/>
                <button className="btn btn-primary" onClick={this.saveData}>Simpan</button><br/>
                <button className="btn btn-primary" onClick={this.addMission}>Tambah Misi</button>
                <Modal visible={this.state.showModal} onClickBackdrop={this.modalClosed}>
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Misi</h5>
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
}
const mapStateToProps = (state) => {
    return {
        hasErrored: state.stages.hasErrored,
        isLoading: state.stages.isLoading,
        isFinish: state.stages.isFinish
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOne: (id) => dispatch(stageFetchOne(id)),
        update: (id,title,teory,time) => dispatch(updateStage(id,title,teory,time)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Stage);
