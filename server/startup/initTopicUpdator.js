Meteor.startup(function () {

  BrowserPolicy.content.allowImageOrigin("http://*");
  SyncedCron.add({
      name: 'Looking for topic to update',
        schedule: function(parser) {
          // parser is a later.parse object
          return parser.text('every 30 minutes');
        },
        job: function() {
          console.log("Running CRON for topic update");
          var topics = Topics.find({}).fetch();
          //var yesterday = moment().subtract(2, 'day');
          //var topics = [{title:"self driving cars", lastSearch:yesterday.format()}];
          processTopicSet(topics);

        }
  });

  SyncedCron.start();
});
