var Page = React.createClass({
  getInitialState: function(){
    return {activePage: <div></div>};
  },
  updateState: function(){
    var that = this;
    getDataPoint('USER_ID', function(d){
      if(d['USER_ID'])
        that.setState({activePage: <HomePage />});
      else 
        that.setState({activePage: <SignupPage />});
    });
  },
  componentDidMount: function() {
    this.updateState();
  },
  render: function(){
    return (this.state.activePage);
  }
});

window.x = React.render(
  <Page />,
  document.getElementById('page-container')
);

var SignupPage = React.createClass({
  render: function(){
    return (<AuthContainer />);
  }
});

var HomePage = React.createClass({
  render: function(){
    return (<MyCourses data={ENROLLMENTS}/>);
  }
});

var ProgressBar = React.createClass({
  render: function(){
    if(this.props.data.overallOutcome)
      var progress = Math.floor(100*(this.props.data.overallOutcome.passedItemsCount / this.props.data.passableItemsCount));
    else
      var progress = 0;
    return (
      <div className="progress-bar">
        <span className="progress-bar-inner" style={{width: progress + "%"}}></span>
      </div>
    );
  }
});

var MyCourses = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var that = this;
    getDataPoint('ENROLLMENTS', function(d){
      that.setState({data:d.ENROLLMENTS});
    });
    chrome.storage.sync.get({
      hideCourses: false
    }, function(items){
      that.setState({hideCourses: items.hideCourses});
    });
  },
  soonestDeadline: function(courseId){
    var now = (new Date).getTime();
    var currMin = Infinity;
    var el = DEADLINES[courseId];
    if(!el) return "";
    for(var i = 0; i< el.length; i++){
      if(el[i].deadline > now && el[i].deadline < currMin)
        currMin = el[i].deadline;
    }
    var daysleft = Math.floor((currMin - now)/ 86400000);
    return daysleft;
  },
  render: function() {
    var that = this;
    return (
      <ul className="course-list">
        {this.state.data.map(function(result) {
          var sinceLastAccess = ((new Date()).getTime()-result.lastAccessedTimestamp) || 0;
          var days = Math.floor(sinceLastAccess / 86400000);
          
          
          var now = (new Date).getTime();
          var currMin = Infinity;
          var currMinId = null;
          var el = DEADLINES[result.courseId];
          if(el){
            for(var i = 0; i< el.length; i++){
              if(el[i].deadline > now && el[i].deadline < currMin){
                currMin = el[i].deadline;
                currMinId = el[i].moduleId;
              }
            }
            var daysleft = Math.floor((currMin - now)/ 86400000);
          }
          else var daysleft = "DNA";
          var showDeadline = daysleft == "DNA" ? "" : "Due in "+daysleft+" days";
          var cx = classNames(
            {'hidden': (7 < daysleft && that.state.hideCourses)},
            'card',
            'animated',
            'bounceInDown'); 
          var classes = classNames(
            {'red': daysleft <= 1},
            {'orange': 7 > daysleft && 1 <= daysleft},
            'days-since'
          );
          if(result.courseId.length < 8) {// OLD COURSERA PAGES
            var route = "https://www.coursera.org/course/"+result.slug;
            var route2 = "";
          }
          else {
            var route = "https://www.coursera.org/learn/"+result.slug+"/home/welcome";
            var route2 = "https://www.coursera.org/learn/modern-postmodern-2/lecture/"+currMinId;
          }
          return (
            <li key={result.id} className={cx}>
              <img src={result.photoUrl} className="course-photo"/>
              <h4><a href={route}>{result.name}</a></h4>
              <div className={classes}>{showDeadline}</div>
              <ProgressBar data={result}/>
            </li>
          );
        })}
      </ul>
    )
  }
});

var AuthContainer = React.createClass({
  handleClick: function(e){
    launchOAuth();
  },
	render: function() {
		return (
			<div id="auth-container">
				<input id="auth-coursera" onClick={this.handleClick} type="submit" value="Authorize coursera"/>
			</div>
		);
	}
});