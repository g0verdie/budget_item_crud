import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class BudgetItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public title: string;

    @Column()
    public fulfillmentDate: Date;

    @Column()
    public resolution: string;

    @Column()
    public price: number;

    @Column()
    public requestor: string;

    @Column()
    @CreateDateColumn()
    createdDate: Date;

    @Column()
    @UpdateDateColumn()
    updatedDate: Date;

    static addItem(budgetItem: BudgetItem) {
        return this.save(budgetItem);
    }

    static addItems(budgetItems: BudgetItem[]) {
        return this.save(budgetItems);
    }
    static findById(id: string) {
        return this.findById(id);
    }

    static findAllPastCreationDate(creationDate: Date): Promise<BudgetItem[]> {
        return this.createQueryBuilder("budgetitem")
            .where("budgetitem.createdDate > :creationDate", {creationDate})
            .getMany();
    }
    static async findByRequestor(requestor: String): Promise<BudgetItem[]> {
        return this.createQueryBuilder("budgetitem")
            .where("budgetitem.requestor = :requestor", { requestor })
            .getMany();
    }

    static async updateResolution(id: string, resolution: string) : Promise<BudgetItem> {
        const item = await this.findById(id);
        item.resolution = resolution;
        return item.save();
    }

    static async fulfillItem(id: string) : Promise<BudgetItem> {
        const item = await this.findById(id);
        
    }
}