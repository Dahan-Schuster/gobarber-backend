import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UsersAlterIdTypeToUuid1590160158423
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'users',
			'id',
			new TableColumn({
				name: 'id',
				type: 'uuid',
				isPrimary: true,
				generationStrategy: 'uuid',
				default: 'uuid_generate_v4()',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn(
			'users',
			'id',
			new TableColumn({
				name: 'id',
				type: 'varchar',
				isPrimary: true,
				generationStrategy: 'uuid',
				default: 'uuid_generate_v4()',
			}),
		);
	}
}
