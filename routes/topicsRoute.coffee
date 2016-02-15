Router.route '/topics/:topic_url',
  name: 'topic',
  waitOn: ->
    Meteor.subscribe('contentItems')
    return
  data: ->
    Topics.findOne url: @params.topic_url

