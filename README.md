# Educate

"key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoLJfpdHPkipj6cam25KTWc5WGaQu8sHS08EyFsxgZIsUrLCWe663I3ruEe5hr+dmnF7rocO8rq+vVGg0NGtjsvzAjrDTC5798SMFGTA0ljXPu0jLMXtiQqOUAkgcqz8Qpanxms/BsYjNz0VSWmZs6NVrEobONJz7IIiHDHadjgDJw17OPHJqdfAzkiqyg9FYpiBISyca1lQlCcuRh9nAB0U16Gv5BBQNIcVf434XNVMH3T5dExX7+SxsNipq73tTugN53t0YmqWzfpgrN+vnivJ64OPONDDyHQKn6OH7oSikgz/AgmAwqKB2O/HBuryNaFgMcI+5+T+YDKJyp3jb6wIDAQAB"


Unofficial Coursera API docs below.
Not complete + not well documented.

## Todo

sort by days inactive

## Info

There seems to be "old" and "new" coursera course pages (v1, v2) ~ 2014 approx change.

# Coursera API Reverse engineered

## Public API

### https://api.coursera.org/api/users/v1/me/enrollments

note courses and enrollments correspond 1-1 but not ordered to correspond.
Also this doesn't seem to correspond to the currently active courses at all.
```
{
	courses: [
		{
			id: 77
			name: "Neural Networks for Machine Learning"
			photo: "https://s3.amazonaws.com/coursera/topics/neuralnets/large-icon.png"
			shortName: "neuralnets"
			smallIconHover: "https://d1z850dzhxs7de.cloudfront.net/topics/neuralnets/small-icon.hover.png"
		},
		...
	],
	enrollments: [
		{
			active: false
			courseId: 77
			endDate: 1381104000
			id: 19160093
			isSigTrack: false
			sessionId: 970603
			startDate: 1375056000
			startStatus: "Past"
		},
		...
	]
}
```

### https://api.coursera.org/api/externalBasicProfiles.v1?q=me&fields=timezone,locale,privacy

## Catalog API

(Pretty useless tbh)

Courses: https://api.coursera.org/api/catalog.v1/courses
Universities: https://api.coursera.org/api/catalog.v1/universities
Categories: https://api.coursera.org/api/catalog.v1/categories
Instructors: https://api.coursera.org/api/catalog.v1/instructors
Sessions: https://api.coursera.org/api/catalog.v1/sessions

## Internal API

some requests are batched at /api/batch and can only be batched.

base: https://www.coursera.org

### https://www.coursera.org/api/opencourse.v1/user/3060151/course/modern-postmodern-2/item/Z1XMK/peer/getAssignment

(not batched)

### /api/openCourseAssets.v1/VkGEvwDQEeWrDSIAC5XBJg

### https://www.coursera.org/api/opencourse.v1/user/3060151/course/modern-postmodern-2/item/Z1XMK/peer/getLatestSubmission

### https://www.coursera.org/api/opencourse.v1/user/3060151/course/modern-postmodern-2/item/Z1XMK/peer/getReviewStats

### /api/opencourse.v1/video/tCaiqgAHEeWqCCIAC7TD7g

### /api/onDemandDiscussionForums.v1/?q=byCourse&courseId=s5sEkwAHEeW9ISIACxWDhA

```
{
	elements: [
		{
			id: "PMmLHir6EeWL_SIACnuNyg",
			name: "General Discussion",
			description: "Use this forum to discuss things related to the course that don’t belong in any of the other forums.",
			order: 1,
			accessAuthGroup: "everyone"
		},
		{
			id: "PKD1Myr6EeWVxyIAC4UJMQ",
			name: "Meet and Greet",
			description: "Introduce yourself and say hello to your fellow classmates!",
			order: 2,
			accessAuthGroup: "everyone"
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandDiscussionQuestions.v1/?courseId=s5sEkwAHEeW9ISIACxWDhA&sort=lastActivityAtDesc&limit=15&includes=creatorId%2ClastAnsweredBy%2CflagId%2C_links&q=byItem&itemId=zEdwZ

### /api/onDemandVideoProgresses.v1/3060151~s5sEkwAHEeW9ISIACxWDhA~tCaiqgAHEeWqCCIAC7TD7g

error not found -- oops coursera

### /api/onDemandInstructorNotes.v1/?courseId=GdeNrll1EeSROyIACtiVvg&includes=instructorIds&fields=instructors.v1(fullName)&q=byCourse

description of course + instructors profiles (long + omitted)

### /api/opencourse.v1/user/{user_id}/course/{course_slug}
(also /api/onDemandCoursesProgress.v1/{user_id}~{course_ident})

users are only auth to query their own
```
{
	modules: {
		7vAcK: 0,
		SkoZT: 100,
		HPSDs: 0,
		...
	},
	lessons: {
		slr3c: 100,
		f9Zs8: 0,
		DAaFw: 0,
		...
	},
	overall: 2,
	items: {
		JguqW: {
			timestamp: 1441492941520,
			progressState: "Completed"
		},
		ENg6D: {
			timestamp: 1441492935116,
			progressState: "Completed"
		}
	},
	nextItem: "mqOt5"
}
```

### /api/openCourseMemberships.v1/?q=findByUser&userId=13364170

(also /api/openCourseMemberships.v1/{user_id}~{course_Ident})
user can only find their own (auth)

```
{
	elements: [
		{
			userId: 3060151,
			courseId: "s5sEkwAHEeW9ISIACxWDhA",
			id: "3060151~s5sEkwAHEeW9ISIACxWDhA",
			timestamp: 1441487278151,
			courseRole: "LEARNER"
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandCompletionEvents.v1/?courseId:{course_ident}

needs reproduction

### /api/onDemandHomeExperiments.v1/?q=byUserAndCourse&userId=3060151&courseSlug=modern-postmodern-2

```
{
	elements: [ ],
	paging: null,
	linked: null
}
```

### /api/onDemandSpecializations.v1

global categories of 'specialization'

```
{
	elements: [
		{
			id: "-ajvNEeXEeWSIg6yKjoojw",
			slug: "ios-development",
			name: "iOS Development for Creative Entrepreneurs",
			tagline: "",
			description: "This Specialization focuses on the basics of iOS application development. (and more I cut)..."
		},
	],
	paging: null,
	linked: null
}
```

### /api/onDemandCourseSchedules.v1/s5sEkwAHEeW9ISIACxWDhA/?fields=defaultSchedule

```
{
	elements: [
		{
			id: "s5sEkwAHEeW9ISIACxWDhA",
			defaultSchedule: {
				periods: [
					{
						moduleIds: [
							"SkoZT"
						],
						numberOfWeeks: 1
					},
					...
				]
			}
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandDeadlineSettings.v1/?q=byUserAndCourse&userId=3060151&courseId=s5sEkwAHEeW9ISIACxWDhA

```
{
	elements: [
		{
			userId: 3060151,
			courseId: "s5sEkwAHEeW9ISIACxWDhA",
			id: "3060151~s5sEkwAHEeW9ISIACxWDhA",
			start: 1441487282181,
			isEnabled: true,
			moduleDeadlines: [
				{
					moduleId: "SkoZT",
					deadline: 1442213999181
				},
				{
					moduleId: "yd8Xq",
					deadline: 1442818799181
				},
				...
			]
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandDefaultInstructorNotes.v1/?courseId=s5sEkwAHEeW9ISIACxWDhA&includes=instructorIds&fields=instructors.v1(fullName)&q=byCourse/api/onDemandHomeProgress.v1

doesnt work

### /api/onDemandInstructorNotes.v1/?courseId=s5sEkwAHEeW9ISIACxWDhA&includes=instructorIds&fields=instructors.v1(fullName)&q=byCourse

```
{
	elements: [ ],
	paging: null,
	linked: {
		instructors.v1: [ ]
	}
}
```

### /api/onDemandHomeProgress.v1/3060151~s5sEkwAHEeW9ISIACxWDhA/?fields=modulesCompleted%2CmodulesPassed

```
{
	elements: [
		{
			userId: 3060151,
			courseId: "s5sEkwAHEeW9ISIACxWDhA",
			id: "3060151~s5sEkwAHEeW9ISIACxWDhA",
			modulesCompleted: [ ],
			modulesPassed: [ ]
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandCourseGrades.v1/s5sEkwAHEeW9ISIACxWDhA

```
{
	elements: [
		{
			id: "s5sEkwAHEeW9ISIACxWDhA",
			timestamp: 1441491952482,
			passingState: "notPassed",
			itemGrades: { },
			passableItemsCount: 5,
			overallOutcome: {
				passedItemsCount: 0,
				courseGrade: 0
			},
			verifiedOutcome: {
				passedItemsCount: 0,
				courseGrade: 0
			}
		}
	],
	paging: null,
	linked: null
}
```

### /api/onDemandClassmateProfiles.v1/?courseId=s5sEkwAHEeW9ISIACxWDhA&q=byExternalIds&externalUserIds=6e7e36c1748d9150056fbfae2f769217&includes=userId%2C_links

```
{
	elements: [
		{
			id: "6e7e36c1748d9150056fbfae2f769217",
			userId: 3060151,
			courseProgressPercentage: 0,
			isCourseCompleted: false,
			postsCount: 0,
			votesReceivedCount: 0
		}
	],
	paging: null,
	linked: {
		onDemandSocialProfiles.v1: [
			{
				id: 3060151,
				fullName: "david furlong",
				photoUrl: "",
				courseRole: "LEARNER"
			}
		]
	},
	links: {
		elements: {
			userId: "onDemandSocialProfiles.v1"
		}
	}
}
```

### /api/courseLists.v1?fields

needs reproduction with fields

### /api/memberships.v1?fields=courseId,enrolledTimestamp,grade,id,lastAccessedTimestamp,onDemandSessionId,role,v1SessionId,vc,vcMembershipId,courses.v1(courseStatus,display,partnerIds,photoUrl,specializations,startDate,v1Details,v2Details),partners.v1(homeLink,name),v1Details.v1(sessionIds),v1Sessions.v1(active,certificatesReleased,dbEndDate,durationString,hasSigTrack,startDay,startMonth,startYear),v2Details.v1(plannedLaunchDate),specializations.v1(logo,name,partnerIds,shortName)&includes=courseId,onDemandSessionId,vcMembershipId,courses.v1(partnerIds,specializations,v1Details,v2Details),v1Details.v1(sessionIds),specializations.v1(partnerIds)&q=me&showHidden=false&filter=current,preEnrolled

course data
grade data

### /api/courses.v1?fields=certificatePartnerLogo,name,partnerIds,partnerLogo,partners.v1(classLogo,logo)&includes=partnerIds&q=slug&slug=modern-postmodern-2&courseType=v2.ondemand

other known fields:
fields=display,partnerIds,photoUrl,startDate,partners.v1(homeLink,name)&includes=partnerIds&q=watchlist

```
{
	elements: [
		{
			id: "s5sEkwAHEeW9ISIACxWDhA",
			partnerLogo: "",
			courseType: "v2.ondemand",
			partnerIds: [
				"34"
			],
			slug: "modern-postmodern-2",
			name: "The Modern and the Postmodern (Part 2)"
		}
	],
	paging: null,
	linked: {
		partners.v1: [
			{
				id: "34",
				shortName: "wesleyan",
				name: "Wesleyan University",
				logo: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-university-assets.s3.amazonaws.com/e6/00d8a35e2324a3a5448474f800cbc4/1-wesleyan_logo.gif"
			}
		]
	}
}
```

### /api/myFeedback.v1/?q=course&courseId=s5sEkwAHEeW9ISIACxWDhA

empty and seems unimportant

all need userid passed. David Furlong: userId:13364170, 3060151
