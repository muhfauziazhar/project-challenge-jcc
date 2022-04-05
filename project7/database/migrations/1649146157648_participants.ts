import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Participants extends BaseSchema {
  protected tableName = "participants";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("full_name").notNullable();
      table.string("business_name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
