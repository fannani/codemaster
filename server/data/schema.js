
import StageType from './types/StageType';
import MissionType from './types/MissionType';

import Mission from './models/Mission';

import courses from './queries/CourseQuery'
import stages from './queries/StageQuery'
import missions from './queries/MissionQuery'


import {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
}  from 'graphql';


const BKQueryRootType = new GraphQLObjectType({
    name: 'BKAppSchema',
    description: "BelajarKode Application Schema Query Root",
    fields: () => ({
        courses,
        stages,
        missions
    })
});

// This is the schema declaration
const BKAppSchema = new GraphQLSchema({
    query: BKQueryRootType

});
 export default BKAppSchema;