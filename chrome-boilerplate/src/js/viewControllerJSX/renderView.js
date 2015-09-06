var Page = React.createClass({
  getInitialState: function(){
    return {activePage: <div></div>};
  },
  componentDidMount: function() {
    var that = this;
    getDataPoint('USER_ID', function(d){
      if(d['USER_ID'])
        that.setState({activePage: <HomePage />});
      else 
        that.setState({activePage: <SignupPage />});
    });
  },
  render: function(){
    return (this.state.activePage);
  }
});

React.render(
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
  },
  render: function() {
    return (
      <ul className="course-list">
        {this.state.data.map(function(result) {
          var classes = React.addons.classSet({
            'red': days >= 3,
            'orange': 3 > days && 1 <= days,
            'days-since': true
          });
          var sinceLastAccess = ((new Date()).getTime()-result.lastAccessedTimestamp) || 0;
          var days = Math.floor(sinceLastAccess / 86400000);
          var route = "https://www.coursera.org/learn/"+result.slug+"/home/welcome";
          return (
            <li key={result.id} className="card">
              <img src={result.photoUrl} className="course-photo"/>
              <h4><a href={route}>{result.name}</a></h4>
              <div className={classes}>{days}</div>
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