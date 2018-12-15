
import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import Guide from '../../components/siswa/Guide';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postLog } from '../../utils/Logs';
import connect from "react-redux/es/connect/connect";
import {courseFetchData,incrementTimer} from "../../actions/gameplay";
import {missionsFetchData} from "../../actions/mission";
import AceEditor from 'react-ace';

class Course extends Component {

    constructor(props) {
        super(props);
        this.handleIframeTask = this.handleIframeTask.bind(this);
        this.checkResult = this.checkResult.bind(this);
        this.modalClosed = this.modalClosed.bind(this);
        this.tick = this.tick.bind(this);
        this.state = {
            initscript : `<!DOCTYPE html>
<html>
    <head>
    </head>

    <body>

    </body>

</html>`,
            score : 0,
            timeText : "00:00",
            life : 3,
            result: [],
            showModal : false,
            modal : {
                title : "",
                desc : ""
            }
        }
    }
    componentDidMount() {
        this.props.fetchData(this.props.match.params.stageid);
        this.props.missionsFetchData(this.props.match.params.stageid);
        window.addEventListener('message', this.handleIframeTask);
        this.intervalHandle = setInterval(this.tick, 1000);
    }
    render() {

        return (
            <div id="container">
                <main role="main" className="container-fluid" style={{ minHeight : "100%",height: "100%" }}>
                    <div className="row" style={{minHeight: "100%",height: "100%"}}>
                        <Guide judul={this.props.judul} materi={this.props.materi} mission={this.props.missions} result={this.state.result} score={this.state.score} time={this.state.timeText} life={this.state.life}/>
                        <div className="col-sm" style={{ marginTop: "10px" }}>
                            <div style={{marginBottom: "5px"}}>
                                <button type="button" id="run"  onClick={this.checkResult} className="btn btn-primary">Periksa</button>
                            </div>
                            <AceEditor
                                style={{ minHeight: "100%",height: "100%"}}
                                mode="html" value={this.state.initscript}
                                setOptions={{
                                    fontSize: "16pt",
                                    vScrollBarAlwaysVisible:true,

                                }}
                                onChange={this.update}
                            />
                        </div>
                        <iframe id='output' style={{ backgroundColor:"#ffffff"}}  frameBorder="0" className="col-sm">
                        </iframe>
                    </div>
                </main>
                <ToastContainer />
                <Modal visible={this.state.showModal} onClickBackdrop={this.modalClosed}>
                    <div className="modal-header">
                        <h5 className="modal-title">{ this.state.modal.title }</h5>
                    </div>
                    <div className="modal-body">
                        <div className="card-body">
                            {this.state.modal.desc}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button"  className="btn btn-secondary">
                            Main lagi (3)
                        </button>
                        <button type="button"  className="btn btn-secondary">
                            Kembali
                        </button>

                    </div>
                </Modal>
            </div>
        );
    }

    tick() {
        this.props.incrementTimer();
        let sec = this.props.currentTimer;
        let min = 0;
        let secStr;
        let minStr;
        if(sec > 59){
            min = Math.floor(sec / 60);
            sec = sec % 60;
        }
        if (sec < 10) {
            secStr = "0"+sec;
        } else {
            secStr = sec;
        }
        if (min < 10) {
            minStr = "0"+min;
        } else {
            minStr = min;
        }
        this.setState({timeText : minStr+":"+secStr});

    }


    checkResult(){
        const idoc = document.getElementById('output').contentWindow.document;
        let value = editor.getValue();
        value += "\x3Cscript src='localhost:3000/js/jquery.min.js'>\x3C/script>";
        value += "\x3Cscript>result=[]\x3C/script>";
        for (let i = 0; i < this.props.missions.length; i++) {
            let misi = this.props.missions[i];
            value += "\x3Cscript>if("+misi.testcase+"){ result.push({  \"index\":"+i+", \"result\":true }) } else {result.push({  \"index\":"+i+", \"result\":false })}\x3C/script>";
        }
        value += "\x3Cscript>parent.postMessage({ \"action\":\"result\", \"data\" : result },'*'); result=[]\x3C/script>";
        idoc.open();
        idoc.write(value);
        idoc.close();
    }

    handleIframeTask(e)  {

        var pass_data = e.data;
        if (pass_data.action == "result") {
            let correctCount = 0;
            let correctCount2 = 0;
            let result = [];
            let i = 0;
            for (let data of pass_data.data) {
                result.push(data);
                if (data.result) {
                    if (typeof this.state.result[i] !== 'undefined') {
                        if (!this.state.result[i].result) {
                            correctCount2++;
                        }
                    } else {
                        correctCount2++;
                    }
                    correctCount++;
                }
                i++;
            }

            this.setState({
                result: result,
                score: (correctCount * 20)
            });
            if (correctCount2 > 0) {
                postLog("misi", "berhasil menyelesaikan misi", correctCount2);
                toast.success("Anda berhasil menyelesaikan " + correctCount2 + " misi", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                if (this.state.life == 1) {
                    this.setState({
                        life: this.state.life - 1
                    })
                    this.gameOver();
                } else {
                    toast.error("Tidak ada jawaban yang benar", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.setState({
                        life: this.state.life - 1
                    })
                }

            }
            if (correctCount >= this.props.missions.length) {
                this.showResult();
            }
        }

    }
    gameOver(){
        this.setState({
            showModal:true
        });
    }
    showResult(){
        this.setState({
            showModal:true
        });
    }
    update(){
        var idoc = document.getElementById('output').contentWindow.document;
        idoc.open();
        idoc.write(editor.getValue());
        idoc.close();
    }
    modalClosed(){

    }

}
const mapStateToProps = (state) => {
    return {
        title: state.gameplay.title,
        teory: state.gameplay.teory,
        time : state.gameplay.time,
        currentTimer : state.gameplay.currentTimer,
        courseLoading : state.gameplay.isLoading,
        courseError: state.gameplay.hasErrored,
        missionsLoading : state.missions.isLoading,
        missionsError: state.missions.hasErrored,
        missions : state.missions.missions

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(courseFetchData(id)),
        missionsFetchData: (id) => dispatch(missionsFetchData(id)),
        incrementTimer : () => dispatch(incrementTimer())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);


