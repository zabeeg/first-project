exports.up = function(knex) {
  return knex.schema
    .createTable('skin_types', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable(); // oily, dry, combination, sensitive, normal
      table.text('description');
      table.text('tips');
      table.timestamps(true, true);
    })
    .createTable('skincare_categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable(); // cleanser, toner, serum, moisturizer, sunscreen, mask
      table.string('description');
      table.integer('order'); // order in routine
      table.string('icon');
      table.timestamps(true, true);
    })
    .createTable('skincare_items', function(table) {
      table.increments('id').primary();
      table.integer('category_id').references('id').inTable('skincare_categories');
      table.integer('skin_type_id').references('id').inTable('skin_types');
      table.string('name').notNullable();
      table.text('description');
      table.text('benefits');
      table.text('how_to_use');
      table.string('image_url');
      table.json('ingredients');
      table.timestamps(true, true);
    })
    .createTable('skincare_routines', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('name').notNullable();
      table.string('time_of_day'); // morning, evening
      table.timestamps(true, true);
    })
    .createTable('routine_items', function(table) {
      table.increments('id').primary();
      table.integer('routine_id').references('id').inTable('skincare_routines').onDelete('CASCADE');
      table.integer('skincare_item_id').references('id').inTable('skincare_items');
      table.integer('order');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('routine_items')
    .dropTable('skincare_routines')
    .dropTable('skincare_items')
    .dropTable('skincare_categories')
    .dropTable('skin_types');
};



