# Running the server

node server.js

# Project plan

new tab extension


# TODOS

- [] Bower
- [] Node dependencies save
- [] Coursera API
- [] Page Setup


# Coursera API Reverse engineered

Public API

https://api.coursera.org/api/users/v1/me/enrollments
https://api.coursera.org/api/externalBasicProfiles.v1?q=me&fields=timezone,locale,privacy

Catalog API

Courses: https://api.coursera.org/api/catalog.v1/courses
Universities: https://api.coursera.org/api/catalog.v1/universities
Categories: https://api.coursera.org/api/catalog.v1/categories
Instructors: https://api.coursera.org/api/catalog.v1/instructors
Sessions: https://api.coursera.org/api/catalog.v1/sessions

Internal API

requests are batched at /api/batch

/api/onDemandInstructorNotes.v1/?courseId=GdeNrll1EeSROyIACtiVvg&includes=instructorIds&fields=instructors.v1(fullName)&q=byCourse
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
/api/courseLists.v1?fields
/api/memberships.v1?fields

all need userid passed. David Furlong: userId:13364170

var xhr = createCORSRequest('POST', "https://api.coursera.org/api/memberships.v1?fields=courseId,enrolledTimestamp,grade,id,lastAccessedTimestamp,onDemandSessionId,role,v1SessionId,vc,vcMembershipId,courses.v1(courseStatus,display,partnerIds,photoUrl,specializations,startDate,v1Details,v2Details),partners.v1(homeLink,name),v1Details.v1(sessionIds),v1Sessions.v1(active,certificatesReleased,dbEndDate,durationString,hasSigTrack,startDay,startMonth,startYear),v2Details.v1(plannedLaunchDate),specializations.v1(logo,name,partnerIds,shortName)&includes=courseId,onDemandSessionId,vcMembershipId,courses.v1(partnerIds,specializations,v1Details,v2Details),v1Details.v1(sessionIds),specializations.v1(partnerIds)&q=me&showHidden=false&filter=current,preEnrolled");

