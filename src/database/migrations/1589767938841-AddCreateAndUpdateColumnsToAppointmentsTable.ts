import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCreateAndUpdateColumnsToAppointmentsTable1589767938841
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumns('appointments', [
			new TableColumn({
				name: 'created_at',
				type: 'timestamp',
				default: 'now()',
			}),
			new TableColumn({
				name: 'updated_at',
				type: 'timestamp',
				default: 'now()',
			}),
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('appointments', 'created_at');
		await queryRunner.dropColumn('appointments', 'updated_at');
	}
}
