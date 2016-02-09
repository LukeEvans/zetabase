// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Zetabase',
  DESCRIPTION: 'An automatic website builder. Niche sites as a service.'
};
