Template['topic'].helpers({
  items: function() {
    console.log("what");
    console.log(ContentItems.find().count());
    return ContentItems.find().fetch();
  },
  image: function() {
    return this.images[0];
  }
})

Template['topic'].events(
)
