import {GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString,GraphQLID} from "graphql";
import StageType from './StageType';
import Stage from '../models/Stage'

const CourseType = new GraphQLObjectType({
    name: "Course",
    description: "This represent an course",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLID)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        desc: {type: new GraphQLNonNull(GraphQLString)},
        imageid: {type : GraphQLString },
        stages: {
            type: new GraphQLList(StageType),
            resolve : ( {_id}) => {
                 return new Promise((resolve,reject) => {
                     Stage.find({ course: _id },(err,stages) =>{
                         resolve(stages);
                     });

                 })
            }
        },
        updated_at: {type: new GraphQLNonNull(GraphQLString)},
    })
});

export default CourseType;

