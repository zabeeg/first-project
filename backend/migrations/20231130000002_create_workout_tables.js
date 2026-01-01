exports.up = function(knex) {
  return knex.schema
    .createTable('workout_categories', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.string('icon');
      table.string('image_url');
      table.timestamps(true, true);
    })
    .createTable('workouts', function(table) {
      table.increments('id').primary();
      table.integer('category_id').references('id').inTable('workout_categories');
      table.string('title').notNullable();
      table.text('description');
      table.string('difficulty'); // beginner, intermediate, advanced
      table.integer('duration_minutes');
      table.integer('calories_burned');
      table.string('image_url');
      table.string('video_url');
      table.json('exercises'); // Array of exercise objects
      table.timestamps(true, true);
    })
    .createTable('user_favorite_workouts', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('workout_id').references('id').inTable('workouts').onDelete('CASCADE');
      table.timestamps(true, true);
      table.unique(['user_id', 'workout_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('user_favorite_workouts')
    .dropTable('workouts')
    .dropTable('workout_categories');
};





















