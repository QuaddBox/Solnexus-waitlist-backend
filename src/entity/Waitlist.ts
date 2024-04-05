import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BaseEntity,
  Unique,
  PrimaryGeneratedColumn,
  Index,
} from "typeorm";

@Entity()
export class Waitlist extends BaseEntity {
  @ObjectIdColumn({})
  id: ObjectId;
  @Column()
  @Index({ unique: true })
  email: string;
}
