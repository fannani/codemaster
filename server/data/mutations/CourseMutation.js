
import {

    GraphQLString,
    GraphQLNonNull
} from 'graphql'

import CourseType from '../types/CourseType'
import Course from '../models/Course'

let CourseMutation = {
    addCourse: {
        type: CourseType,
        description: 'Add Course',
        args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            desc: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: (root,{ name, desc })=>{

            return new Promise((resolve,reject)=>{
                let newcourse = new Course({ name,desc});
                newcourse.save((err) => {
                    err ? reject(err) : resolve(newcourse)
                })
            })
        }
    }
}

export default CourseMutation;
