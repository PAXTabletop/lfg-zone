import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model } = DS;

export default Model.extend({
  title: DS.attr('string'),
  time: DS.attr('date'),
  table: DS.attr('string'),

  startTime: new Date,
  endTime: computed('time', 'startTime', function() {
    return startTime + time;
  })
});
