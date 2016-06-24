import Ember from 'ember';

export default Ember.Route.extend({

  setupController() {
    let application = this.controllerFor('application');
    application.set('pageTitle', 'Basics');

    this.controller.set('title', 'default title');
    this.controller.set('description', 'default description');
  },

  actions: {
    transitionToNext(newClass) {
      console.log("going to location");
      this.replaceWith('location', newClass);
    },

    failure() {
      console.log("failed!");
    },

    continue() {
      console.log("continuing (making a record)");
      console.log("title is:", this.controller.get('title'));

      var newClass = this.store.createRecord('class', {
        title: this.controller.get('title'),
        description: this.controller.get('description')
      });

      newClass.save()
        .then(() => {
          console.log("going to location");
          this.replaceWith('location');
        })
        .catch(this.failure);
    }
  }

});
