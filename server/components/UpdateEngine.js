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
      if (tweet.entities.urls && tweet.entities.urls.length > 0) {
        createArticleCI(topic._id, tweet);
      }
    });
  }));

  //Topics.update({_id:topic._id}, {lastSearch: moment().format()});
  Topics.update({_id:topic._id}, {$set: {lastSearch: moment().format()}});
}

// Create a base Content Item object
generateBaseCI = function(tweet) {
  console.log("ID: " + tweet.id);
  console.log("id_str: " + tweet.id_str);
  var ci = {
    _id: tweet.id_str,
    id: tweet.id,
    createdAt: tweet.created_at,
    previewText: tweet.text
  }

  return ci;
}

// Create an article specific Content Item
createArticleCI = function(topicId, tweet) { var ci = generateBaseCI(tweet);

  fetchHtml(tweet.entities.urls[0].expanded_url, function(htmlResult){
    var data = extractor(htmlResult.content);

  // Add additional information to CI object
    ci.topicId = topicId;
    ci.images = [data.image];
    ci.videos = data.videos;
    ci.title = data.title;
    ci.text = data.text;
    ci.originLink = data.canonicalLink;

    if (validCI(ci) && uniqueCI(ci)) {
      ContentItems.insert(ci);
    }
    else {
      console.log("Invalid CI. Ignoring...");
    }
  });
}

// Determine if Content Item is valid
validCI = function(ci) {
  if (ci.images.length == 0) return false;
  if (ci.images[0] == null) return false;
  if (ci.title == "") return false;
  if (ci.previewText == "") return false;
  if (ci.originLink == "") return false;
  return true;
}

// Determine if CI already exists
// Because apparantly IDs are worthless
uniqueCI = function(ci) {
  if (ContentItems.find(ci._id).count() > 0) return false;
  if (ContentItems.find({title: ci.title}).count() > 0) return false;
  return true;
}


