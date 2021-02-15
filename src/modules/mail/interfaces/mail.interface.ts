export interface IBody {
  sender?: ISender;
  to?: ITo[];
  bcc?: IBcc[];
  cc?: ICc[];
  htmlContent?: string;
  textContent?: string;
  subject: string;
  replyTo?: IReplyTo;
  attachment?: IAttachment[];
  headers?: Record<string, unknown>;
  templateId?: number;
  params?: Record<string, unknown>;
  messageVersions?: IMessageVersions;
  tags?: string[];
}

export interface ISender {
  name?: string;
  email?: string;
  id?: number;
}

export interface ITo {
  name?: string;
  email: string;
}

export interface IBcc {
  name?: string;
  email: string;
}

export interface ICc {
  name?: string;
  email: string;
}

export interface IReplyTo {
  name?: string;
  email: string;
}

export interface IAttachment {
  url: string;
  content: string;
  name: string;
}

export interface IMessageVersions {
  to: ITo;
  params?: Record<string, unknown>;
  bcc?: IBcc[];
  cc?: ICc[];
  replyTo?: IReplyTo;
}
