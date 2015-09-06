URL = 'https://accounts.coursera.org/oauth2/v1/auth?response_type=code&client_id=W_NN1oUeu1cMtQjSg5-KgA&redirect_uri='+encodeURIComponent('https://oggmggbmpdkmbonekoaopclgcoopbnpg.chromiumapp.org/provider_cb')+'&scope=view_profile&state=csrf_code1234';
CODE = null;
ACCESS_TOKEN = null;
USER_COURSES = [];
USER_ID = null;

// current courses
ENROLLMENTS = [];

csl = chrome.storage.local;

function storeData(o, cb){
	if(cb != undefined)
		csl.set(o, cb)
	else
		csl.set(o, function() {});
}


function getData(){
	csl.get(['CODE', 'ACCESS_TOKEN', 'USER_COURSES', 'USER_ID', 'ENROLLMENTS'], function(items){
		CODE = items.CODE || CODE;
		ACCESS_TOKEN = items.ACCESS_TOKEN || ACCESS_TOKEN;
		USER_COURSES = items.USER_COURSES || USER_COURSES;
		USER_ID = items.USER_ID || USER_ID;
		ENROLLMENTS = items.ENROLLMENTS || ENROLLMENTS;

		if(!USER_ID && ACCESS_TOKEN) getUserId();
		if(USER_ID && ACCESS_TOKEN) getCourseraData();
	});
}

function getDataPoint(x, cb){
	csl.get([x], cb);
}

getData();