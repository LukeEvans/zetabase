Template.topic.helpers({
  items: function() {
    return ContentItems.find({topicId: this._id});
  },
  image: function() {
    return this.images[0];
  }
});

Template.topic.events(
);
