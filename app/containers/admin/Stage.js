import React, {Component} from 'react';
import {addStage,stageFetchOne,updateStage} from "../../actions/stages";
import connect from "react-redux/es/connect/connect";

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
    render() {
        return (
            <div>
                <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title} placeholder="Judul"/><br/>
                <textarea name="teory" id="teory" cols="30" rows="10" onChange={this.handleInputChange} value={this.state.teory} placeholder="Teory" /><br/>
                <input type="text" name="time" onChange={this.handleInputChange} value={this.state.time} placeholder="Waktu"/><br/>
                <button className="btn btn-primary" onClick={this.saveData}>Simpan</button>
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
