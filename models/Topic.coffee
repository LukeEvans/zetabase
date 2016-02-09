root = exports ? this

root.Topic = new Mongo.Collection 'Topic'

# Collection2 already does schema checking
# Add custom permission rules if needed
root.Topic.allow(
  insert : -> true

  update : -> true

  remove : -> true
)
