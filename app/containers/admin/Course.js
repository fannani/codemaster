import React, {Component} from 'react';
import Modal from "react-bootstrap4-modal";

class Course extends Component {
    constructor(props){
        super(props);
        this.createCourse = this.createCourse.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
        this.state = {

            showModal : false,

        }
    }
    render() {
        return (
            <div>
                <div onClick={this.createCourse} className="btn btn-primary">Tambah Course</div>
                <Modal visible={this.state.showModal} onClickBackdrop={this.modalClosed}>
                    <div className="modal-header">
                        <h5 className="modal-title">Tambah Course</h5>
                    </div>
                    <div className="modal-body">
                        <div className="card-body">
                           <input type="text" placeholder="name" name="name"/>
                           <input type="text" placeholder="description" name="desc" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"  className="btn btn-primary">
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

    createCourse(){
        this.setState({
            showModal:true
        });
    }
    modalClosed(){
        this.setState({
            showModal:false
        });
    }
}

export default Course;