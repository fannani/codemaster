import {GraphQLList} from "graphql";
import MissionType from "../types/MissionType";
import Mission from "../models/Mission";

const missions =  {
    type: new GraphQLList(MissionType),
        description: "List of all Mission",
        resolve: function() {
        return new Promise((resolve,reject)=>{
            Mission.find({},function(err, missions) {
                err ? reject(err) : resolve(missions)
            })
        })
    }
}
export default missions;