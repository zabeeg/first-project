exports.up = function(knex) {
  return knex.schema
    .createTable('outfit_categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.string('icon');
      table.string('image_url');
      table.timestamps(true, true);
    })
    .createTable('outfits', function(table) {
      table.increments('id').primary();
      table.integer('category_id').references('id').inTable('outfit_categories');
      table.string('title').notNullable();
      table.text('description');
      table.string('style'); // coquette, casual, sporty, elegant, etc.
      table.string('season'); // spring, summer, fall, winter, all
      table.string('occasion'); // everyday, date, party, work
      table.string('image_url');
      table.json('items'); // Array of clothing items
      table.json('tags');
      table.timestamps(true, true);
    })
    .createTable('user_favorite_outfits', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('outfit_id').references('id').inTable('outfits').onDelete('CASCADE');
      table.timestamps(true, true);
      table.unique(['user_id', 'outfit_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('user_favorite_outfits')
    .dropTable('outfits')
    .dropTable('outfit_categories');
};



