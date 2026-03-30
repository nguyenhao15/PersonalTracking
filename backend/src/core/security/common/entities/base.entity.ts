// src/common/entities/base.entity.ts
import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string; // Lưu ID của User

  @Column({ nullable: true })
  updatedBy: string;
}
