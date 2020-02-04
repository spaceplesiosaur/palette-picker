exports.up = function(knex) {
  return knex.schema
  .createTable('projects', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.boolean('current').defaultTo(false);
  })
  .createTable('palettes', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('color1');
    table.string('color2');
    table.string('color3');
    table.string('color4');
    table.string('color5');
    table.integer('project_id');
    table.foreign('project_id').references('projects.id')

    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('palettes');
  .dropTable('projects');
};
