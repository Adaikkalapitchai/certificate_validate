import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  holderName: string;

  @Column()
  courseName: string;

  @Column()
  instituteName: string;

  @Column()
  issueDate: Date;

  @Column({ unique: true })
  verificationCode: string;
}