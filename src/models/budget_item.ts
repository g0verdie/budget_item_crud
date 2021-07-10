import { BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class BudgetItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title!: string;

    @Column()
    public requestedDate!: Date;

    @Column()
    public fulfillmentDate: Date;

    @Column()
    public resolution: string;

    @Column()
    public price: number;

    @Column()
    public requestor: string;
}