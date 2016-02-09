var extractor= Meteor.npmRequire('unfluff');

// Process set of topics
processTopicSet = function(topics) {
  console.log(topics);
  _.each(topics, function(topic) {
    processTopic(topic);
  });
}

// Process a single topic
processTopic = function(topic) {
  // Get a set of tweets for this topic
  tweetsForTopicSince(topic.title, topic.lastSearch, Meteor.bindEnvironment(function(err, results) {
    _.each(results.statuses, function(tweet) {
      console.log(JSON.stringify(tweet, null, 2));
      if (tweet.entities.urls && tweet.entities.urls.length > 0) {
        createArticleCI(tweet);
      }
    });
  }));
}

// Create a base Content Item object
generateBaseCI = function(tweet) {
  var ci = {
    _id: tweet.id_str,
    createdAt: tweet.created_at,
    previewText: tweet.text
  }

  return ci;
}

// Create an article specific Content Item
createArticleCI = function(tweet) {
  var ci = generateBaseCI(tweet);
  console.log("---------------------");
  console.log(JSON.stringify(tweet));
  console.log("---------------------");

  fetchHtml(tweet.entities.urls[0].expanded_url, function(htmlResult){
    var data = extractor(htmlResult.content);
    console.log(JSON.stringify(data, null, 2));

    // Add additional information to CI object
    ci.images = [data.image];
    ci.videos = data.videos;
    ci.title = data.title;
    ci.text = data.text;

    console.log(JSON.stringify(ci, null, 2));
    ContentItems.insert(ci);
  });
}

