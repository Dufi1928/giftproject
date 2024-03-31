<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240331144328 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE gift_lists (id INT AUTO_INCREMENT NOT NULL, user_id_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, expiration_date DATETIME NOT NULL, INDEX IDX_1D0ECF1E9D86650F (user_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE gifts (id INT AUTO_INCREMENT NOT NULL, gift_list_id_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, current_price DOUBLE PRECISION NOT NULL, original_price DOUBLE PRECISION NOT NULL, reserved TINYINT(1) NOT NULL, INDEX IDX_651BCF2FB26CDBF (gift_list_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE gift_lists ADD CONSTRAINT FK_1D0ECF1E9D86650F FOREIGN KEY (user_id_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE gifts ADD CONSTRAINT FK_651BCF2FB26CDBF FOREIGN KEY (gift_list_id_id) REFERENCES gift_lists (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE gift_lists DROP FOREIGN KEY FK_1D0ECF1E9D86650F');
        $this->addSql('ALTER TABLE gifts DROP FOREIGN KEY FK_651BCF2FB26CDBF');
        $this->addSql('DROP TABLE gift_lists');
        $this->addSql('DROP TABLE gifts');
        $this->addSql('DROP TABLE `user`');
    }
}
