import { db } from '..';

(async () =>
{
  let tableName; /* placeholder variable for table names. */

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create CHARACTERS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'characters';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.string('player_id', 25).notNullable();
    table.string('name', 255);
    table.float('exp').defaultTo(0);
    table.string('class', 255);

    for(const field of
        [
          'level',
          'hp',
          'max_hp',
          'temp_hp',
          'str',
          'dex',
          'con',
          'int',
          'wis',
          'cha',
          'inspiration',
          'prof_bonus',
        ])
      table.integer(field).defaultTo(0);

    table.string('throws_profs', 25);
    table.text('other_prof');

    for(const field of
        [
          'armor_class',
          'speed'
        ])
      table.integer(field).defaultTo(0);

    table.string('hit_dice', 20);
    table.integer('hit_dice_total');

    for(const field of
        [
          'death_save_success',
          'death_save_fail'
        ])
      table.integer(field, 1).defaultTo(0);

    table.text('special_points');

    for(const field of
        [
          'copper',
          'silver',
          'electrum',
          'gold',
          'platinum',
        ])
      table.integer(field).defaultTo(0);

    table.string('spellcasting_class', 255);
    table.string('spellcasting_ability', 15);

    table.integer('spell_dc').defaultTo(0);
    table.integer('spell_atk_bonus').defaultTo(0);

    for(const [ field, length ] of
        [
          [ 'background', 128 ],
          [ 'race', 128 ],
          [ 'alignment', 20 ],
        ])
      table.string(field, length);

    table.string('languages', 500);

    /* Add indices */
    table.index('player_id', 'player_id');
    table.index('name', `${tableName}_name`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create CHARACTERISTICS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'characteristics';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();

    for(const field of
        [
          'traits',
          'ideals',
          'bonds',
          'flaws',
        ])
      table.text(field);

    for(const [ field, length ] of
        [
          [ 'age', 100 ],
          [ 'height', 100 ],
          [ 'weight', 100 ],
          [ 'eyes', 100 ],
          [ 'skin', 100 ],
          [ 'hair', 100 ],
          [ 'appearance', 255 ],
          [ 'org_name', 255 ],
          [ 'org_symbol', 255 ],
        ])
      table.string(field, length);

    for(const field of
    [
      'org_description',
      'backstory',
      'treasure',
    ])
      table.text(field);

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create SKILLS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'skills';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();
    table.string('proficiencies', 255);

    for(const field of
        [
          'acrobatics',
          'animal_handling',
          'arcana',
          'athletics',
          'deception',
          'history',
          'insight',
          'intimidation',
          'investigation',
          'medicine',
          'nature',
          'perception',
          'performance',
          'persuasion',
          'religion',
          'sleight_of_hand',
          'stealth',
          'survival',
        ])
      table.integer(field).defaultTo(0);

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create ATTACKS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'attacks';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();
    table.string('name', 255);
    table.integer('atk_bonus').defaultTo(0);
    table.string('damage', 50);
    table.string('damage_type', 50);

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
    table.index('name', `${tableName}_name`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create EQUIPMENT table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'equipment';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();
    table.string('name', 255);
    table.text('description');
    table.integer('item_id');

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
    table.index('name', `${tableName}_name`);
    table.index('item_id', 'item_id');
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create FEATURES table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'features';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();
    table.string('name', 255);
    table.text('description');
    table.integer('feat_id');

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
    table.index('name', `${tableName}_name`);
    table.index('feat_id', 'feat_id');
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create SPELLS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'spells';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();
    table.integer('level').defaultTo(1);
    table.string('name', 255);
    table.text('description');
    table.boolean('is_cantrip').defaultTo(false);
    table.integer('spell_id');

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
    table.index('name', `${tableName}_name`);
    table.index('spell_id', 'spell_id');
    table.index('level', `${tableName}_level`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);



  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  /* Create SPELL SLOTS table. */
  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  tableName = 'spell_slots';
  await db.schema.createTable(tableName, table =>
  {
    /* Create fields */
    table.increments('id');
    table.integer('char_id').notNullable();

    for(const field of
    [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
    ])
    {
      table.integer(`lvl_${field}`).defaultTo(0);
      table.integer(`lvl_${field}_max`).defaultTo(0);
    }

    /* Add indices */
    table.index('char_id', `${tableName}_char_id`);
  })
    .catch(error => createError(error, tableName));

  console.log(`Created ${tableName} table.`);
  console.log('Done.');
})()
  .then(() => process.exit(0));

function createError(error, table)
{
  console.log(`Error occurred on creating the ${table} table.`);
  console.error(error);
}
