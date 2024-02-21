import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations'; // or `@mikro-orm/migrations-mongodb`
import { MySqlDriver } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import Person from './entities/Person.js';

export default defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  entities: [Person],
  driver: MySqlDriver,
  user: "maximinetto",
  password: "maxi08041994",
  host: "localhost",
  dbName: "test",
  port: 3314,
  // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
  dynamicImportProvider: id => import(id)
})