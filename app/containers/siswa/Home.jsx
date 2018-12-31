import React, {Component} from 'react';
import Content from '../../components/siswa/Content';
import connect from "react-redux/es/connect/connect";
import Redirect from "react-router-dom/es/Redirect";

class Home extends Component {
  render() {
    if(!this.props.isLogin){
      return <Redirect push to={'login'} />
    }
    return(

      <div className="container-fluid">
        <div className="row justify-content-center">
          {/*<Sidebar/>*/}
          <Content />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogin: state.users.loggedIn
})

export default connect(
  mapStateToProps,
  null,
)(Home);
