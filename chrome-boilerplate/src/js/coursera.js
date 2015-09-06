// PULLS DATA from coursera
var openCourseMemberships = 'http://coursera.org/api/openCourseMemberships.v1/?q=findByUser&userId=';
// this is useless since it doesn't work.
var enrollments = 'https://api.coursera.org/api/users/v1/me/enrollments';

function getOpenCourseMemberships(){
	var xhr = createCORSRequest('GET', "http://www.coursera.org/api/openCourseMemberships.v1/?q=findByUser&userId="+USER_ID);
	if (!xhr) throw new Error('CORS not supported');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhr.onload = function() {
	    var response = JSON.parse(xhr.responseText);

	    console.log(response);
	};

	xhr.onerror = function() {
	   console.error('Woops, there was an error making the request');
	};
	xhr.send();
}

function getCourseGrades(course_id){
	var xhr = createCORSRequest('POST', "https://www.coursera.org/api/batch");
	if (!xhr) throw new Error('CORS not supported');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhr.onload = function() {
	    var response = JSON.parse(xhr.responseText);
	    console.log('Course grades');
	    var r = response[0].bodyJson.elements;
	    if(r){
		    for(var i = 0; i < r.length; i++){
		    	for(var j = 0;j< ENROLLMENTS.length; j++){
		    		if(r[i].id == ENROLLMENTS[j].courseId){
		    			var o = ENROLLMENTS[j];
		    			o.overallOutcome = r[i].overallOutcome;
		    			o.passableItemsCount = r[i].passableItemsCount;
		    			o.passingState = r[i].passingState;
		    			ENROLLMENTS[j] = o;
		    			break;
		    		}
		    	}
		    }
		    storeData({'ENROLLMENTS':ENROLLMENTS});
		    window.x.updateState();
		    // FINISH LOADING QUEUE
		}
	};

	xhr.onerror = function() {
	   console.error('Woops, there was an error making the request '+ident);
	};
	xhr.send('{"0":{"method":"GET","url":"/api/onDemandCourseGrades.v1/'+course_id+'","headers":{}}}');
}

function getCourseDetails(){
	var xhr = createCORSRequest('POST', "https://www.coursera.org/api/batch");
	if (!xhr) throw new Error('CORS not supported');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhr.onload = function() {
	    var response = JSON.parse(xhr.responseText);
	    console.log('Course details');
	    var myCourses = [];
	    var r = response['0'].bodyJson;
	    for(var i = 0; i < r.elements.length; i++){
	    	for(var j = 0; j< r.linked['courses.v1'].length; j++){
	    		if(r.elements[i].courseId == r.linked['courses.v1'][j].id){
	    			var n = {
	    				courseId: r.elements[i].courseId,
	    				enrolledTimestamp: r.elements[i].enrolledTimestamp,
	    				grade: r.elements[i].grade,
	    				lastAccessedTimestamp: r.elements[i].lastAccessedTimestamp,
	    				name: r.linked['courses.v1'][j].name,
	    				slug: r.linked['courses.v1'][j].slug,
	    				startDate: r.linked['courses.v1'][j].startDate,
	    				photoUrl: r.linked['courses.v1'][j].photoUrl
	    			}
	    			myCourses.push(n);
	    			break;
	    		}
	    	}

	    }
	    ENROLLMENTS = myCourses;
	    storeData({'ENROLLMENTS':ENROLLMENTS}, function(){
	    	for(var i = 0; i < r.elements.length; i++){
	    		getCourseGrades(r.elements[i].courseId);
	    	}
	    });  
	};

	xhr.onerror = function() {
	   console.error('Woops, there was an error making the request ');
	};
	xhr.send('{"0":{"method":"GET","url":"/api/memberships.v1?fields=courseId,enrolledTimestamp,grade,id,lastAccessedTimestamp,onDemandSessionId,role,v1SessionId,vc,vcMembershipId,courses.v1(courseStatus,display,partnerIds,photoUrl,specializations,startDate,v1Details,v2Details),partners.v1(homeLink,name),v1Details.v1(sessionIds),v1Sessions.v1(active,certificatesReleased,dbEndDate,durationString,hasSigTrack,startDay,startMonth,startYear),v2Details.v1(plannedLaunchDate),specializations.v1(logo,name,partnerIds,shortName)&includes=courseId,onDemandSessionId,vcMembershipId,courses.v1(partnerIds,specializations,v1Details,v2Details),v1Details.v1(sessionIds),specializations.v1(partnerIds)&q=me&showHidden=false&filter=current,preEnrolled","headers":{}}}');
}

function getUserId(){
	var xhr = createCORSRequest('POST', "https://www.coursera.org/api/batch");
	if (!xhr) throw new Error('CORS not supported');
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	// xhr.setRequestHeader("Authorization", "Bearer "+ACCESS_TOKEN);
	xhr.onload = function() {
	    var response = JSON.parse(xhr.responseText);
	    console.log(response);
	    if(response['0'].bodyJson.elements[0].userId){
	    	USER_ID = response['0'].bodyJson.elements[0].userId;
	    	storeData({'USER_ID':USER_ID});
	    	getCourseraData();
	    }
	};

	xhr.onerror = function() {
	   console.error('Woops, there was an error making the request '+ident);
	};
	xhr.send('{"0":{"method":"GET","url":"/api/memberships.v1?fields=courseId,enrolledTimestamp,grade,id,lastAccessedTimestamp,onDemandSessionId,role,v1SessionId,vc,vcMembershipId,courses.v1(courseStatus,display,partnerIds,photoUrl,specializations,startDate,v1Details,v2Details),partners.v1(homeLink,name),v1Details.v1(sessionIds),v1Sessions.v1(active,certificatesReleased,dbEndDate,durationString,hasSigTrack,startDay,startMonth,startYear),v2Details.v1(plannedLaunchDate),specializations.v1(logo,name,partnerIds,shortName)&includes=courseId,onDemandSessionId,vcMembershipId,courses.v1(partnerIds,specializations,v1Details,v2Details),v1Details.v1(sessionIds),specializations.v1(partnerIds)&q=me&showHidden=false&filter=current,preEnrolled","headers":{}}}');
}

function getCourseraData(){ // initial setup
	getAPICall(openCourseMemberships+USER_ID, 'openCourseMemberships', false);
	// getAPICall(enrollments, 'enrollments', true);
}

function getAPICall(url, ident, auth){
	var xhr = createCORSRequest('GET', url);
	if (!xhr) throw new Error('CORS not supported');
	if(auth)
		xhr.setRequestHeader('Authorization', 'Bearer '+ACCESS_TOKEN);

	xhr.onload = function() {
	    var response = JSON.parse(xhr.responseText);
	    var o = {};
	    o[ident] = response;
	    console.log(ident);
	    console.log(response);
	    if(ident == 'enrollments'){
	    	var currentCourses = [];
	    	for(var i = 0; i < response.enrollments.length; i++){
	    		if(response.enrollments[i].active){
	    			for(var j = 0; j < response.courses.length; j++){
	    				if(response.enrollments[i].courseId == response.courses[j].id){
	    					var o = {'course':response.courses[j], 'enrollment':response.enrollments[i]};
	    					currentCourses.push(o);
	    					break;
	    				}
	    			}
	    		}
	    	} 
	    	ENROLLMENTS = currentCourses;
	    	storeData({'ENROLLMENTS': ENROLLMENTS});	
	    }
	    else if(ident == 'openCourseMemberships'){
	    	for(var i = 0; i < response.elements.length; i++){
	    		getCourseDetails();
	    	}
	    }
	};

	xhr.onerror = function() {
	   console.error('Woops, there was an error making the request '+ident);
	};
	xhr.send();
}