import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1590161520231
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'provider');
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'providerId',
				type: 'uuid',
				isNullable: true,
			}),
		);
		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'fk_appointments_users',
				columnNames: ['providerId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'appointments',
			'fk_appointments_users',
		);
		await queryRunner.dropColumn('appointments', 'providerId');
		await queryRunner.addColumn(
			'appointments',
			new TableColumn({
				name: 'provider',
				type: 'varchar',
			}),
		);
	}
}
