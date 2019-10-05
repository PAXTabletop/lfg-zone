import Route from '@ember/routing/route';

export default Route.extend({
  // TODO: replace with call to db
  async model() {
    return [{
      title: 'Agricola',
      time: Date.now() + 10 * 60000,
      table: 3
    }, {
      title: 'Barenpark',
      time: Date.now() + 3 * 60000,
      table: 5
    }, {
      title: 'Caylus',
      time: Date.now() + 7 * 60000,
      table: 2
    }];
  }
});
