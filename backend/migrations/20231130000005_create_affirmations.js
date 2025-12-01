exports.up = function(knex) {
  return knex.schema.createTable('affirmations', function(table) {
    table.increments('id').primary();
    table.text('text').notNullable();
    table.string('category'); // confidence, beauty, strength, self-love, motivation
    table.string('author');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('affirmations');
};



