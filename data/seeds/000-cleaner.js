
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return require('knex-cleaner').clean(knex);
};
