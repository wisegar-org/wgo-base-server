import { AGVNewsletterInscriptionStatusEnum, AGVNewsletterMessageStatusEnum } from './enums';

//Inscriptions
export interface INewsletterInscriptionInput {
  email: string;
  status: AGVNewsletterInscriptionStatusEnum;
}

export interface INewsletterInscriptionModel extends INewsletterInscriptionInput {
  id: number;
}

export interface INewsletterInscriptionFilterInput {
  email: string;
  status: string;
}

export interface INewsletterInscriptionPageInput {
  skip: number;
  take: number;
  descending: boolean;
  sortBy: string;
  filter: INewsletterInscriptionFilterInput;
}

//Messages
export interface INewsletterMessageInput {
  message: string;
  title: string;
  status: AGVNewsletterMessageStatusEnum;
}

export interface INewsletterMessageModel extends INewsletterMessageInput {
  id: number;
}

export interface INewsletterMessageFilterInput {
  title: string;
  status: string;
}

export interface INewsletterMessagePageInput {
  skip: number;
  take: number;
  descending: boolean;
  sortBy: string;
  filter: INewsletterMessageFilterInput;
}
