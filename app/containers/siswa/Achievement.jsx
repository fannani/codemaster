import React, { Component } from "react";
import { Query } from "react-apollo";
import { GET_ACHIEVEMENTS } from "../../graphql/achievementQuery";
import AchievementItem from "../../components/siswa/AchievementItem";
import connect from "react-redux/es/connect/connect";

class Achievement extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginLeft: '30px', fontSize: '40px' }}>Achievement</h2>
        <Query query={GET_ACHIEVEMENTS}  variables={{ player: this.props.user.userdetailid  }}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading</div>
            if (error)
              return <p>Sorry! There was an error loading the items</p>;
            return (
              <div >
                {data.achievements.map(achiev => (
                  <AchievementItem  key={achiev._id}  achievement={achiev}/>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.users.user
})
export default connect(
  mapStateToProps,
  null,
)(Achievement);

