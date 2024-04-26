import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const linksTable = pgTable(
  'links',
  {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    short: varchar('short', { length: 50 }),
    created_at: timestamp('created_at').defaultNow(),
  },
  (links) => {
    return { urlIndex: uniqueIndex('url_idx').on(links.url) };
  }
);

export const customerTable = pgTable(
  'customer',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    dob: date('dob').notNull(),
    nric: varchar('nric', { length: 12 }),
    address: text('address'),
    hp: varchar('hp', { length: 10 }),
    tel: text('tel'),
    timestamp: timestamp('timestamp').defaultNow(),
  },
  (customer) => {
    return { nricIndex: uniqueIndex('nric_idx').on(customer.nric) };
  }
);

const textureEnum = pgEnum('texture', ['fine', 'medium', 'thick']);

const currentHairConditionEnum = pgEnum('current_hair_condition', [
  'normal',
  'resistant',
  'damage',
  'very damage',
]);

const currentScapConditionEnum = pgEnum('current_scalp_condition', [
  'normal',
  'dry',
  'oily',
  'dandruff',
  'sensitive',
]);

const whiteHairSaturationEnum = pgEnum('white_hair_saturation', [
  'undetectable',
  'minimally visible',
  'moderately visible',
  'saturated',
]);

export const hairDetailTable = pgTable('hair_detail', {
  id: serial('id').primaryKey(),
  customer_id: integer('customer_id')
    .notNull()
    .references(() => customerTable.id),
  natural_base: integer('natural_base').notNull(),
  texture: textureEnum('texture'),
  current_hair_condition: currentHairConditionEnum('current_hair_condition'),
  current_scalp_condition: currentScapConditionEnum('current_scalp_condition'),
  white_hair_saturation: whiteHairSaturationEnum('white_hair_saturation'),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const appointmentTable = pgTable('appointment', {
  id: serial('id').primaryKey(),
  customer_id: integer('customer_id')
    .notNull()
    .references(() => customerTable.id),
  stylist_id: integer('stylist_id')
    .notNull()
    .references(() => stylistTable.id),
  remarks: text('remarks'),
  appt_date_time: timestamp('appt_date_time').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const hairServiceTable = pgTable('hair_service', {
  id: serial('id').primaryKey(),
  appointment_id: integer('appointment_id')
    .notNull()
    .references(() => appointmentTable.id),
  service_type: integer('service_type')
    .notNull()
    .references(() => hairServiceDetailTable.id),
  payment_type: integer('payment_type')
    .notNull()
    .references(() => hairServiceDetailTable.id),
  price: integer('price').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const serviceTypeTable = pgTable('service_type', {
  // id, name, description length 50, timestamp
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 }).notNull().unique(),
  description: varchar('description', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const paymentTypeTable = pgTable('payment_type', {
  // id, name, description length 50, timestamp
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 }).notNull().unique(),
  description: varchar('description', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const hairServiceDetailTable = pgTable('hair_service_detail', {
  //id, service_id, variable_key references variableKeyTable.id, value varchar 50 not null, timestamp
  id: serial('id').primaryKey(),
  service_id: integer('service_id')
    .notNull()
    .references(() => serviceTypeTable.id),
  variable_key: integer('variable_key')
    .notNull()
    .references(() => variableKeyTable.id),
  value: varchar('value', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export default variableKeyTable = pgTable('variable_key', {
  //id, name varchar15 not null, description varchar 50 not null, timestamp
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 15 }).notNull().unique(),
  description: varchar('description', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});

export const stylistTable = pgTable('stylist', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  rank: integer('rank').notNull(),
});


export const rankTable = pgTable('rank', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 25 }).notNull().unique(),
  description: varchar('description', { length: 50 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});
