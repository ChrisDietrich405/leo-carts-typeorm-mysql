import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 32 })
  name!: string;

  @Column({ unique: true, type: "varchar", length: 32 })
  email!: string;

  @Column({ type: "varchar", length: 32 })
  password!: string;

  @Column({ nullable: false, default: 0, type: "boolean" })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
