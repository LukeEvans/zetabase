T = new Twit({
  consumer_key: '7yzFY6MWyR9mWaoblGchNgTiC',
  consumer_secret: 'm5P7NI6G2joZIzAh2Ljse1CGZl7OLCaZb4cwFunElxlhuYBmno',
  access_token: '47467178-5qo8qeopdXzgPbxUHtbV2Mb6G0yt4S5X9UQ24MQWd',
  access_token_secret: 'yI9Sh8HamXl8m1DIeXz64qgUZG4kf8Nez63UHO6DMOGG6'
});

tweetsForTopicSince = function(topic, lastSearch, callback) {
  T.get('search/tweets', {
    q: topic,
    since: lastSearch,
    count: 10
  }, callback)
};
