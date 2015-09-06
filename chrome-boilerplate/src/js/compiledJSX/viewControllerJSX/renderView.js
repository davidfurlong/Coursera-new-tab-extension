'use strict';

var Page = React.createClass({
  displayName: 'Page',

  getInitialState: function getInitialState() {
    return { activePage: React.createElement('div', null) };
  },
  updateState: function updateState() {
    var that = this;
    getDataPoint('USER_ID', function (d) {
      if (d['USER_ID']) that.setState({ activePage: React.createElement(HomePage, null) });else that.setState({ activePage: React.createElement(SignupPage, null) });
    });
  },
  componentDidMount: function componentDidMount() {
    this.updateState();
  },
  render: function render() {
    return this.state.activePage;
  }
});

window.x = React.render(React.createElement(Page, null), document.getElementById('page-container'));

var SignupPage = React.createClass({
  displayName: 'SignupPage',

  render: function render() {
    return React.createElement(AuthContainer, null);
  }
});

var HomePage = React.createClass({
  displayName: 'HomePage',

  render: function render() {
    return React.createElement(MyCourses, { data: ENROLLMENTS });
  }
});

var ProgressBar = React.createClass({
  displayName: 'ProgressBar',

  render: function render() {
    if (this.props.data.overallOutcome) var progress = Math.floor(100 * (this.props.data.overallOutcome.passedItemsCount / this.props.data.passableItemsCount));else var progress = 0;
    return React.createElement(
      'div',
      { className: 'progress-bar' },
      React.createElement('span', { className: 'progress-bar-inner', style: { width: progress + "%" } })
    );
  }
});

var MyCourses = React.createClass({
  displayName: 'MyCourses',

  getInitialState: function getInitialState() {
    return { data: [] };
  },
  componentDidMount: function componentDidMount() {
    var that = this;
    getDataPoint('ENROLLMENTS', function (d) {
      that.setState({ data: d.ENROLLMENTS });
    });
    chrome.storage.sync.get({
      hideCourses: false
    }, function (items) {
      that.setState({ hideCourses: items.hideCourses });
    });
  },
  soonestDeadline: function soonestDeadline(courseId) {
    var now = new Date().getTime();
    var currMin = Infinity;
    var el = DEADLINES[courseId];
    if (!el) return "";
    for (var i = 0; i < el.length; i++) {
      if (el[i].deadline > now && el[i].deadline < currMin) currMin = el[i].deadline;
    }
    var daysleft = Math.floor((currMin - now) / 86400000);
    return daysleft;
  },
  render: function render() {
    var that = this;
    return React.createElement(
      'ul',
      { className: 'course-list' },
      this.state.data.map(function (result) {
        var sinceLastAccess = new Date().getTime() - result.lastAccessedTimestamp || 0;
        var days = Math.floor(sinceLastAccess / 86400000);

        var now = new Date().getTime();
        var currMin = Infinity;
        var currMinId = null;
        var el = DEADLINES[result.courseId];
        if (el) {
          for (var i = 0; i < el.length; i++) {
            if (el[i].deadline > now && el[i].deadline < currMin) {
              currMin = el[i].deadline;
              currMinId = el[i].moduleId;
            }
          }
          var daysleft = Math.floor((currMin - now) / 86400000);
        } else var daysleft = "DNA";
        var showDeadline = daysleft == "DNA" ? "" : "Due in " + daysleft + " days";
        var cx = classNames({ 'hidden': 7 < daysleft && that.state.hideCourses }, 'card', 'animated', 'bounceInDown');
        var classes = classNames({ 'red': daysleft <= 1 }, { 'orange': 7 > daysleft && 1 <= daysleft }, 'days-since');
        if (result.courseId.length < 8) {
          // OLD COURSERA PAGES
          var route = "https://www.coursera.org/course/" + result.slug;
          var route2 = "";
        } else {
          var route = "https://www.coursera.org/learn/" + result.slug + "/home/welcome";
          var route2 = "https://www.coursera.org/learn/modern-postmodern-2/lecture/" + currMinId;
        }
        return React.createElement(
          'li',
          { key: result.id, className: cx },
          React.createElement('img', { src: result.photoUrl, className: 'course-photo' }),
          React.createElement(
            'h4',
            null,
            React.createElement(
              'a',
              { href: route },
              result.name
            )
          ),
          React.createElement(
            'div',
            { className: classes },
            showDeadline
          ),
          React.createElement(ProgressBar, { data: result })
        );
      })
    );
  }
});

var AuthContainer = React.createClass({
  displayName: 'AuthContainer',

  handleClick: function handleClick(e) {
    launchOAuth();
  },
  render: function render() {
    return React.createElement(
      'div',
      { id: 'auth-container' },
      React.createElement('input', { id: 'auth-coursera', onClick: this.handleClick, type: 'submit', value: 'Authorize coursera' })
    );
  }
});