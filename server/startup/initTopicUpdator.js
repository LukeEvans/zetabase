Meteor.startup(function () {

  BrowserPolicy.content.allowImageOrigin("http://*");
  SyncedCron.add({
      name: 'Looking for topic to update',
        schedule: function(parser) {
          // parser is a later.parse object
          //return parser.text('at 6:00 pm');
          return parser.text('every 30 seconds');
        },
        job: function() {
          console.log("Running CRON for topic update");
          var topics = Topics.find({}).fetch();
          processTopicSet(topics);

        }
  });

  SyncedCron.start();
});
