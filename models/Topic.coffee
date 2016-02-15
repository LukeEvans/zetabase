root = exports ? this

root.Topics = new Mongo.Collection 'topics'

# Collection2 already does schema checking
# Add custom permission rules if needed
root.Topics.allow(
  insert : -> true

  update : -> true

  remove : -> true
)
