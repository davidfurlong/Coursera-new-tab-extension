# Info

There seems to be "old" and "new" coursera course pages (v1, v2) ~ 2014 approx change.

# Coursera API Reverse engineered

## Public API

### https://api.coursera.org/api/users/v1/me/enrollments

note courses and enrollments correspond 1-1 but not ordered to correspond.
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

Courses: https://api.coursera.org/api/catalog.v1/courses
Universities: https://api.coursera.org/api/catalog.v1/universities
Categories: https://api.coursera.org/api/catalog.v1/categories
Instructors: https://api.coursera.org/api/catalog.v1/instructors
Sessions: https://api.coursera.org/api/catalog.v1/sessions

## Internal API

some requests are batched at /api/batch andcan only be batched.

base: https://www.coursera.org

### /api/onDemandInstructorNotes.v1/?courseId=GdeNrll1EeSROyIACtiVvg&includes=instructorIds&fields=instructors.v1(fullName)&q=byCourse

description of course + instructors profiles

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

### /api/openCourseMemberships.v1/?q=findByUser&userId=13364170

-- 401 error --
returns
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

### /api/courseLists.v1?fields

### /api/memberships.v1?fields

### /api/courses.v1?fields=certificatePartnerLogo,name,partnerIds,partnerLogo,partners.v1(classLogo,logo)&includes=partnerIds&q=slug&slug=modern-postmodern-2&courseType=v2.ondemand

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

all need userid passed. David Furlong: userId:13364170, 3060151
