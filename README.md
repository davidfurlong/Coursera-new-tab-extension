# Running the server

node server.js

# Project plan



# TODOS

# Coursera API Reverse engineered

Public API

https://api.coursera.org/api/users/v1/me/enrollments
https://api.coursera.org/api/externalBasicProfiles.v1?q=me&fields=timezone,locale,privacy


Internal API

requests are batched at /api/batch

/api/opencourse.v1/user/13364170/course/{Course title}
/api/onDemandCourseGrades.v1/{Course Ident}
/api/openCourseMemberships.v1/{User id}~{Course Ident}
/api/openCourseMemberships.v1/?q=findByUser&userId=13364170
/api/onDemandCompletionEvents.v1/?courseId:GdeNrll1EeSROyIACtiVvg
/api/onDemandCoursesProgress.v1/{User id}~{Course Ident}
/api/onDemandHomeExperiments.v1/
/api/openCourseMemberships.v1/?q=findByUser&userId=13364170
/api/onDemandSpecializations.v1
/api/onDemandCourseSchedules.v1
/api/onDemandInstructorNotes.v1
/api/onDemandHomeProgress.v1

all need userid passed. David Furlong: userId:13364170
