Router.route '/', ->
  console.log("heeee");
  this.render 'home'
  SEO.set { title: "Home - #{Meteor.App.NAME}" }
