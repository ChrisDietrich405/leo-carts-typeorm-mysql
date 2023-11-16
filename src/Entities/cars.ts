import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length: 32 })
  name!: string;

  @Column({type: "varchar", length: 32 })
  make!: string;

  @Column({type: "varchar", length: 32 })
  model!: string;

  @Column({ default: 0, type: "boolean", nullable: false })
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
