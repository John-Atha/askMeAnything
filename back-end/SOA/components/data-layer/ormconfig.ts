module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: ["dist/**/*.entity{.ts,.js}"],
    logging: true,
    migrations: ["dist/migration/*{.ts,.js}"],
    cli: {
        migrationsDir: "migration"
    },
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
}