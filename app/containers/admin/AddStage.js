import React, {Component} from 'react';
import {addStage,stageFetchOne,updateStage} from "../../actions/stages";
import connect from "react-redux/es/connect/connect";

class AddStage extends Component {
    constructor(props){
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.addStage = this.addStage.bind(this);
        this.state = {
            title : "",
            teory : "",
            time : ""
        }
    }
    componentWillMount() {
        this.props.fetchOne(this.props.match.params.stageid).then((stage)=> {
            console.log(stage);
        })
    }

    render() {
        return (
            <div>
                <input type="text" name="title" onChange={this.onValueChange} value={this.state.title} placeholder="Judul"/><br/>
                <textarea name="teory" id="teory" cols="30" rows="10" onChange={this.onValueChange} value={this.state.teory} placeholder="Teory" /><br/>
                <input type="text" name="time" onChange={this.onValueChange} value={this.state.time} placeholder="Waktu"/><br/>
                <button className="btn btn-primary" onClick={this.addStage}>Simpan</button>
            </div>
        );
    }

    addStage(){
        const s = this.state;
        this.props.add(s.title,s.time,this.props.match.params.courseid,s.teory).then((stage)=>{

        })
    }

    onValueChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
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
        update: (data) => dispatch(updateStage(data)),
        fetchOne: (id) => dispatch(stageFetchOne(id))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddStage);
