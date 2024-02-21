import { Migration } from '@mikro-orm/migrations';

export class Migration20240221125859 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `person` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

  async down(): Promise<void> {
    this.addSql('drop table `person` ')
  }
}
