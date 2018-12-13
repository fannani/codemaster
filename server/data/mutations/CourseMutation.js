
import {

    GraphQLString,
    GraphQLNonNull
} from 'graphql'

import CourseType from '../types/CourseType'
import Course from '../models/Course'

let CourseMutation = {
    addArticle: {
        type: CourseType,
        description: 'Add Course',
        args: {
            title: {type: new GraphQLNonNull(GraphQLString)},

        },
        resolve: ()=>{

        }
    }
}

export default CourseMutation
