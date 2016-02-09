Router.route '/topics/', ->
  Meteor.subscribe('contentItems');
  this.render 'topic'
