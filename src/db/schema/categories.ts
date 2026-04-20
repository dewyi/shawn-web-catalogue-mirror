import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  parentId: uuid("parent_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
