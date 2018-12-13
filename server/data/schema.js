import CourseType from './types/CourseType';
import StageType from './types/StageType';
import MissionType from './types/MissionType';
import Course from './models/Course';
import Mission from './models/Mission';
import Stage from './models/Stage';


import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
}  from 'graphql';


const BKQueryRootType = new GraphQLObjectType({
    name: 'BKAppSchema',
    description: "BelajarKode Application Schema Query Root",
    fields: () => ({
        courses: {
            type: new GraphQLList(CourseType),
            description: "List of all Course",
            resolve: function() {
                return new Promise((resolve,reject)=>{
                    Course.find({},function(err, courses) {
                        err ? reject(err) : resolve(courses)
                    })
                })
            }
        },
        stages: {
            type: new GraphQLList(StageType),
            description: "List of all Stage",
            resolve: function() {
                return new Promise((resolve,reject)=>{
                    Stage.find({},function(err, stages) {
                        err ? reject(err) : resolve(stages)
                    })
                })
            }
        },
        missions: {
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
    })
});

// This is the schema declaration
const BKAppSchema = new GraphQLSchema({
    query: BKQueryRootType

});
 export default BKAppSchema;