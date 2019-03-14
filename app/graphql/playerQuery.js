

export const GET_COURSE_BY_PLAYER = gql`
    query GetCourseByPlayer($courseid: ID!) {
        stages(course: $courseid) {
            _id
            title
            time
            teory
            imageid
            course {
                _id
            }
        }
    }
`;