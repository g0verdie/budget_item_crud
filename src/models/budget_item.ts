import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ResolutionTypes } from "../constants/budget_item_consts";

@Entity()
export class BudgetItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
  })
  public title: string;

  @Column({
      type: "datetime"
  })
  public fulfillmentDate: Date;

  @Column({
    type: "enum",
    enum: ResolutionTypes,
    default: ResolutionTypes.CREATED,
  })
  public resolution: string;

  @Column()
  public price: number;

  @Column()
  public requestor: string;

  @Column({
    type: "datetime"
})
  @CreateDateColumn()
  createdDate: Date;

  @Column({
    type: "datetime"
})
  @UpdateDateColumn()
  updatedDate: Date;

  static addItem(budgetItem: BudgetItem) {
    return this.save(budgetItem);
  }

  static addItems(budgetItems: BudgetItem[]) {
    return this.save(budgetItems);
  }
  static findById(id: string) : Promise<BudgetItem> {
    return this.findById(id);
  }

  static findAllPastCreationDate(creationDate: Date): Promise<BudgetItem[]> {
    return this.createQueryBuilder("budgetitem")
      .where("budgetitem.createdDate > :creationDate", { creationDate })
      .getMany();
  }
  static async findByRequestor(requestor: String): Promise<BudgetItem[]> {
    return this.createQueryBuilder("budgetitem")
      .where("budgetitem.requestor = :requestor", { requestor })
      .getMany();
  }

  static async findByTitle(title: String): Promise<BudgetItem> {
    return this.createQueryBuilder("budgetitem")
      .where("budgetitem.title = :title", { title })
      .getOne();
  }

  static async updateResolution(
    id: string,
    resolution: string
  ): Promise<BudgetItem> {
    const item = await this.findById(id);
    item.resolution = resolution;
    return item.save();
  }

  static async fulfillItem(id: string): Promise<BudgetItem> {
    const item = await this.findById(id);

    item.resolution = ResolutionTypes.FULFILLED;

    return item.save();
  }
}
