export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AgvContentsInput = {
  contents: Scalars['String']['input'];
};

export type AgvContentsResponse = {
  __typename?: 'AGVContentsResponse';
  contents: Scalars['String']['output'];
};

export type AgvEventFilterInput = {
  class?: InputMaybe<Scalars['String']['input']>;
  enrollment?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  visible?: InputMaybe<Scalars['String']['input']>;
};

export type AgvEventGetNextsResponse = {
  __typename?: 'AGVEventGetNextsResponse';
  corso?: Maybe<AgvEventResponse>;
  evento?: Maybe<AgvEventResponse>;
};

export type AgvEventGetPageResponse = {
  __typename?: 'AGVEventGetPageResponse';
  count: Scalars['Float']['output'];
  events: Array<AgvEventResponse>;
};

export type AgvEventInput = {
  class: Scalars['String']['input'];
  description: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  enrollment: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
  imgList?: InputMaybe<Array<Scalars['Int']['input']>>;
  imgTitle?: InputMaybe<Scalars['Int']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  state: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  visible: Scalars['Boolean']['input'];
};

export type AgvEventPageInput = {
  descending: Scalars['Boolean']['input'];
  filter?: InputMaybe<AgvEventFilterInput>;
  skip: Scalars['Float']['input'];
  sortBy: Scalars['String']['input'];
  take: Scalars['Float']['input'];
};

export type AgvEventResponse = {
  __typename?: 'AGVEventResponse';
  class: Scalars['String']['output'];
  description: Scalars['String']['output'];
  endDate?: Maybe<Scalars['DateTimeISO']['output']>;
  enrollment: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  imgList?: Maybe<Array<MediaResponse>>;
  imgTitle?: Maybe<MediaResponse>;
  inscriptions: Scalars['Float']['output'];
  shortDescription?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTimeISO']['output']>;
  state: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type AgvInscriptionAddResponse = {
  __typename?: 'AGVInscriptionAddResponse';
  create?: Maybe<Scalars['Boolean']['output']>;
  error?: Maybe<Scalars['Boolean']['output']>;
  exist?: Maybe<Scalars['Boolean']['output']>;
};

export type AgvInscriptionFilterInput = {
  class?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  eventClass?: InputMaybe<Scalars['String']['input']>;
  eventTitle?: InputMaybe<Scalars['String']['input']>;
  nome?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type AgvInscriptionGetPageResponse = {
  __typename?: 'AGVInscriptionGetPageResponse';
  count: Scalars['Float']['output'];
  inscriptions: Array<AgvInscriptionResponse>;
};

export type AgvInscriptionInput = {
  class: Scalars['String']['input'];
  cognome: Scalars['String']['input'];
  email: Scalars['String']['input'];
  eventId: Scalars['Int']['input'];
  id: Scalars['Float']['input'];
  message: Scalars['String']['input'];
  nome: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type AgvInscriptionPageInput = {
  descending: Scalars['Boolean']['input'];
  filter?: InputMaybe<AgvInscriptionFilterInput>;
  skip: Scalars['Float']['input'];
  sortBy: Scalars['String']['input'];
  take: Scalars['Float']['input'];
};

export type AgvInscriptionResponse = {
  __typename?: 'AGVInscriptionResponse';
  class: Scalars['String']['output'];
  cognome: Scalars['String']['output'];
  date: Scalars['DateTimeISO']['output'];
  email: Scalars['String']['output'];
  event: AgvEventResponse;
  eventClass: Scalars['String']['output'];
  eventId: Scalars['Float']['output'];
  eventTitle: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  message: Scalars['String']['output'];
  nome: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type AgvNewsletterGetInscriptionResponse = {
  __typename?: 'AGVNewsletterGetInscriptionResponse';
  inscription?: Maybe<AgvNewsletterInscriptionResponse>;
};

export type AgvNewsletterGetMessagesResponse = {
  __typename?: 'AGVNewsletterGetMessagesResponse';
  message?: Maybe<AgvNewsletterMessageResponse>;
};

export type AgvNewsletterInscriptionFilterInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type AgvNewsletterInscriptionInput = {
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  status: Scalars['String']['input'];
};

export type AgvNewsletterInscriptionPageInput = {
  descending: Scalars['Boolean']['input'];
  filter?: InputMaybe<AgvNewsletterInscriptionFilterInput>;
  skip: Scalars['Float']['input'];
  sortBy: Scalars['String']['input'];
  take: Scalars['Float']['input'];
};

export type AgvNewsletterInscriptionResponse = {
  __typename?: 'AGVNewsletterInscriptionResponse';
  email: Scalars['String']['output'];
  id?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
};

export type AgvNewsletterInscriptionSendEmailStatusInput = {
  emails: Array<Scalars['String']['input']>;
};

export type AgvNewsletterInscriptionsPageResponse = {
  __typename?: 'AGVNewsletterInscriptionsPageResponse';
  count: Scalars['Float']['output'];
  inscriptions: Array<AgvNewsletterInscriptionResponse>;
};

export type AgvNewsletterMessageFilterInput = {
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AgvNewsletterMessageInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  message: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type AgvNewsletterMessagePageInput = {
  descending: Scalars['Boolean']['input'];
  filter?: InputMaybe<AgvNewsletterMessageFilterInput>;
  skip: Scalars['Float']['input'];
  sortBy: Scalars['String']['input'];
  take: Scalars['Float']['input'];
};

export type AgvNewsletterMessageResponse = {
  __typename?: 'AGVNewsletterMessageResponse';
  id?: Maybe<Scalars['Float']['output']>;
  message: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AgvNewsletterMessagesPageResponse = {
  __typename?: 'AGVNewsletterMessagesPageResponse';
  count: Scalars['Float']['output'];
  messages: Array<AgvNewsletterMessageResponse>;
};

export type ContactMeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  contactName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  mapPath?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type ContactMeResponse = {
  __typename?: 'ContactMeResponse';
  address: Scalars['String']['output'];
  contactName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  mapPath: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type DeleteTranslationInput = {
  key: Scalars['String']['input'];
};

export type EditUserInput = {
  address?: Scalars['String']['input'];
  cap?: Scalars['String']['input'];
  certificate?: Scalars['String']['input'];
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  isEmailConfirmed?: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  userName: Scalars['String']['input'];
};

export type EmailResponse = {
  __typename?: 'EmailResponse';
  error: Scalars['String']['output'];
  isSuccess: Scalars['Boolean']['output'];
  sent: Scalars['Boolean']['output'];
};

export type ExportTranslationInput = {
  languagesId?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type FinanceAccountResponse = {
  __typename?: 'FinanceAccountResponse';
  id: Scalars['Float']['output'];
};

export type FinanceAssignedToOption = {
  __typename?: 'FinanceAssignedToOption';
  address?: Maybe<Scalars['String']['output']>;
  avatar_url?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  cap?: Maybe<Scalars['String']['output']>;
  card_number?: Maybe<Scalars['Float']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  id_github?: Maybe<Scalars['Float']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  node_id?: Maybe<Scalars['String']['output']>;
  pay_by_hours?: Maybe<Scalars['Float']['output']>;
  place?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type FinanceCollaboratorResponse = {
  __typename?: 'FinanceCollaboratorResponse';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  login: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type FinanceIssuesFilterInput = {
  assignedTo?: Scalars['String']['input'];
  labels?: Scalars['String']['input'];
  maxDate?: Scalars['String']['input'];
  minDate?: Scalars['String']['input'];
  project?: Scalars['Float']['input'];
  repository?: Scalars['String']['input'];
  status?: Scalars['Float']['input'];
};

export type FinanceIssuesPageInput = {
  descending?: Scalars['Boolean']['input'];
  filter: FinanceIssuesFilterInput;
  skip?: Scalars['Float']['input'];
  sortBy?: Scalars['String']['input'];
  take?: Scalars['Float']['input'];
};

export type FinanceIssuesPageResponse = {
  __typename?: 'FinanceIssuesPageResponse';
  issues: Array<FinanceIssuesResponse>;
  issuesCount: Scalars['Float']['output'];
};

export type FinanceIssuesResponse = {
  __typename?: 'FinanceIssuesResponse';
  account?: Maybe<FinanceAccountResponse>;
  accountId?: Maybe<Scalars['Float']['output']>;
  assignedTo?: Maybe<FinanceCollaboratorResponse>;
  assignedToId?: Maybe<Scalars['Float']['output']>;
  closed_at: Scalars['DateTimeISO']['output'];
  created_at: Scalars['DateTimeISO']['output'];
  description: Scalars['String']['output'];
  hours: Scalars['Float']['output'];
  id: Scalars['Float']['output'];
  labels: Scalars['String']['output'];
  last_comment?: Maybe<Scalars['String']['output']>;
  milestones: Scalars['String']['output'];
  number: Scalars['Float']['output'];
  owner: Scalars['String']['output'];
  project?: Maybe<FinanceProjectResponse>;
  projectId?: Maybe<Scalars['Float']['output']>;
  repo: Scalars['String']['output'];
  repository: FinanceRepositoryResponse;
  repositoryId: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTimeISO']['output'];
  url: Scalars['String']['output'];
};

export type FinanceLabelOption = {
  __typename?: 'FinanceLabelOption';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type FinanceProjectOption = {
  __typename?: 'FinanceProjectOption';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type FinanceProjectResponse = {
  __typename?: 'FinanceProjectResponse';
  id: Scalars['Float']['output'];
};

export type FinanceRepositoryOption = {
  __typename?: 'FinanceRepositoryOption';
  id: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type FinanceRepositoryResponse = {
  __typename?: 'FinanceRepositoryResponse';
  id: Scalars['Float']['output'];
};

export type GetAllTranslationInput = {
  languageId: Scalars['Float']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GetTranslationByKeysInput = {
  keys: Array<Scalars['String']['input']>;
  languageId: Scalars['Float']['input'];
};

export type HistoricFiltersResponse = {
  __typename?: 'HistoricFiltersResponse';
  actions: Array<Scalars['String']['output']>;
  entities: Array<Scalars['String']['output']>;
  usernames: Array<Scalars['String']['output']>;
};

export type HistoricPageFilterInput = {
  action?: InputMaybe<Scalars['String']['input']>;
  entity?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type HistoricPageInput = {
  descending: Scalars['Boolean']['input'];
  filter?: InputMaybe<HistoricPageFilterInput>;
  skip: Scalars['Float']['input'];
  sortBy: Scalars['String']['input'];
  take: Scalars['Float']['input'];
};

export type HistoricPageResponse = {
  __typename?: 'HistoricPageResponse';
  count: Scalars['Float']['output'];
  histories: Array<HistoricResponse>;
};

export type HistoricResponse = {
  __typename?: 'HistoricResponse';
  action: Scalars['String']['output'];
  creatoIl: Scalars['DateTimeISO']['output'];
  entity: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  message: Scalars['String']['output'];
  modificatoIl: Scalars['DateTimeISO']['output'];
  snapshot: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type IdInput = {
  id: Scalars['Float']['input'];
};

export type ImportTranslationsInput = {
  /** File uploaded */
  file?: InputMaybe<Scalars['Upload']['input']>;
};

export type IndexContentInputs = {
  imageId: Scalars['Float']['input'];
  translations: Array<TranslationInput>;
};

export type IndexContentResponse = {
  __typename?: 'IndexContentResponse';
  image?: Maybe<MediaResponse>;
};

export type LanguageInput = {
  code: Scalars['String']['input'];
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
};

export type LanguagePostInput = {
  code: Scalars['String']['input'];
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
};

export type LanguageResponse = {
  __typename?: 'LanguageResponse';
  code: Scalars['String']['output'];
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
};

export type LocalStorageResponse = {
  __typename?: 'LocalStorageResponse';
  storage: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  user: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String']['output'];
  user?: Maybe<UserResponse>;
};

export type MeInput = {
  token: Scalars['String']['input'];
};

export type MediaInput = {
  /** File uploaded */
  file: Scalars['Upload']['input'];
  /** Flag public file */
  isPublic: Scalars['Boolean']['input'];
};

export type MediaResponse = {
  __typename?: 'MediaResponse';
  data?: Maybe<Scalars['String']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  mimetype?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type MediasInput = {
  /** File uploaded */
  files: Array<MediaInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  agvCreateEvent: Scalars['Boolean']['output'];
  agvCreateInscription: AgvInscriptionAddResponse;
  agvDeleteNewsletterMessage: Scalars['Boolean']['output'];
  agvModifyContents: Scalars['Boolean']['output'];
  agvModifyEvent: Scalars['Boolean']['output'];
  agvPostNewsletterInscription: Scalars['Boolean']['output'];
  agvPostNewsletterMessage: Scalars['Boolean']['output'];
  agvPutNewsletterInscription: Scalars['Boolean']['output'];
  agvPutNewsletterMessage: Scalars['Boolean']['output'];
  agvSendNewsletterMessage: Scalars['Boolean']['output'];
  agvZyncNewsletterInscriptions: Scalars['Boolean']['output'];
  changeResetPassword: Scalars['Boolean']['output'];
  clearLocalStorage: Scalars['Boolean']['output'];
  confirmRegist: Scalars['Boolean']['output'];
  deleteStorageItem: Scalars['Boolean']['output'];
  deleteTranslation: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  editUser: UserResponse;
  importTranslations: Scalars['Boolean']['output'];
  login: LoginResponse;
  postLanguage: LanguageResponse;
  postMediaFile: MediaResponse;
  postMediaFiles: Array<MediaResponse>;
  postStorageItem: Scalars['Boolean']['output'];
  postTemplate: Scalars['Boolean']['output'];
  putLanguage: LanguageResponse;
  putStorageItem: Scalars['Boolean']['output'];
  register: UserResponse;
  resendConfirmation: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  setContactData: Scalars['Boolean']['output'];
  setIndexContent: Scalars['Boolean']['output'];
  setKeyLocalStorage: Scalars['Boolean']['output'];
  setSetting: Scalars['Boolean']['output'];
  setTranslation: Array<TranslationResponse>;
};


export type MutationAgvCreateEventArgs = {
  data: AgvEventInput;
};


export type MutationAgvCreateInscriptionArgs = {
  data: AgvInscriptionInput;
};


export type MutationAgvDeleteNewsletterMessageArgs = {
  id: Scalars['Float']['input'];
};


export type MutationAgvModifyContentsArgs = {
  data: AgvContentsInput;
};


export type MutationAgvModifyEventArgs = {
  data: AgvEventInput;
};


export type MutationAgvPostNewsletterInscriptionArgs = {
  data: AgvNewsletterInscriptionInput;
};


export type MutationAgvPostNewsletterMessageArgs = {
  data: AgvNewsletterMessageInput;
};


export type MutationAgvPutNewsletterInscriptionArgs = {
  data: AgvNewsletterInscriptionInput;
};


export type MutationAgvPutNewsletterMessageArgs = {
  data: AgvNewsletterMessageInput;
};


export type MutationAgvSendNewsletterMessageArgs = {
  id: Scalars['Float']['input'];
};


export type MutationChangeResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationConfirmRegistArgs = {
  data: MeInput;
};


export type MutationDeleteStorageItemArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTranslationArgs = {
  data: DeleteTranslationInput;
};


export type MutationDeleteUserArgs = {
  data: IdInput;
};


export type MutationEditUserArgs = {
  data: EditUserInput;
};


export type MutationImportTranslationsArgs = {
  data: ImportTranslationsInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationPostLanguageArgs = {
  data: LanguagePostInput;
};


export type MutationPostMediaFileArgs = {
  data: MediaInput;
  urlApi: Scalars['String']['input'];
};


export type MutationPostMediaFilesArgs = {
  data: MediasInput;
  urlApi: Scalars['String']['input'];
};


export type MutationPostStorageItemArgs = {
  data: StorageInput;
};


export type MutationPostTemplateArgs = {
  data: TemplateInput;
};


export type MutationPutLanguageArgs = {
  data: LanguageInput;
};


export type MutationPutStorageItemArgs = {
  data: StorageInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResendConfirmationArgs = {
  data: ResendConfirmationInput;
};


export type MutationResetPasswordArgs = {
  data: ResendConfirmationInput;
};


export type MutationSetContactDataArgs = {
  data: ContactMeInput;
};


export type MutationSetIndexContentArgs = {
  data: IndexContentInputs;
};


export type MutationSetKeyLocalStorageArgs = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};


export type MutationSetSettingArgs = {
  data: PostSettingInput;
};


export type MutationSetTranslationArgs = {
  data: SetTranslationInput;
};

export type PostSettingInput = {
  key: Scalars['String']['input'];
  type_settings: Scalars['String']['input'];
  value: PostSettingValueInput;
};

export type PostSettingValueInput = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  agvAllContents: AgvContentsResponse;
  agvAllEvents: Array<AgvEventResponse>;
  agvAllEventsByPage: AgvEventGetPageResponse;
  agvAllInscriptions: Array<AgvInscriptionResponse>;
  agvAllInscriptionsByPage: AgvInscriptionGetPageResponse;
  agvGetAllClassEvents: Array<Scalars['String']['output']>;
  agvGetContentHistory: HistoricResponse;
  agvGetEvent: AgvEventResponse;
  agvGetNewsletterInscriptionByEmail: AgvNewsletterGetInscriptionResponse;
  agvGetNewsletterInscriptionsPage: AgvNewsletterInscriptionsPageResponse;
  agvGetNewsletterInscriptionsResendStatus: Scalars['Boolean']['output'];
  agvGetNewsletterMessageById: AgvNewsletterGetMessagesResponse;
  agvGetNewsletterMessagesPage: AgvNewsletterMessagesPageResponse;
  agvGetNextEvents: AgvEventGetNextsResponse;
  deleteMediaFiles: Scalars['Boolean']['output'];
  exportTranslations: Scalars['String']['output'];
  getAllEventHistory: Array<HistoricResponse>;
  getAllLanguage: Array<LanguageResponse>;
  getAllRoles: Array<Scalars['String']['output']>;
  getAllSettings: Array<SettingsResponse>;
  getAllTranslations: Array<TranslationResponse>;
  getAllTranslationsByKeys: Array<TranslationResponse>;
  getAllUserHistoric: Array<HistoricResponse>;
  getAllUsers: Array<UserResponse>;
  getContactData: ContactMeResponse;
  getEventHistory: HistoricResponse;
  getFinanceIssues: FinanceIssuesPageResponse;
  getFinanceIssuesAssignedToOptions: Array<FinanceAssignedToOption>;
  getFinanceIssuesLabelOptions: Array<FinanceLabelOption>;
  getFinanceIssuesProjectOptions: Array<FinanceProjectOption>;
  getFinanceIssuesRepositoryOptions: Array<FinanceRepositoryOption>;
  getHistoricFilters: HistoricFiltersResponse;
  getHistoricPage: HistoricPageResponse;
  getIndexContent: IndexContentResponse;
  getLanguage: LanguageResponse;
  getLocalStorage: LocalStorageResponse;
  getMediaFile: MediaResponse;
  getStorageByPagination: StoragePageResponse;
  getStorageByType: Array<StorageResponse>;
  getTemplateByType: TemplateResponse;
  getUser: UserResponse;
  getUserAllHistoricByUser: Array<HistoricResponse>;
  getUserHistoric: HistoricResponse;
  getVersion: Scalars['String']['output'];
  me: UserResponse;
  sendEmail: EmailResponse;
  sendEmailFromToAddressAndApp: EmailResponse;
  sendEmailFromToApp: EmailResponse;
  sendEmailToApp: EmailResponse;
  serverVersion: Scalars['String']['output'];
  validUserName: Scalars['Boolean']['output'];
};


export type QueryAgvAllContentsArgs = {
  urlApi: Scalars['String']['input'];
};


export type QueryAgvAllEventsArgs = {
  urlApi: Scalars['String']['input'];
};


export type QueryAgvAllEventsByPageArgs = {
  data: AgvEventPageInput;
  urlApi: Scalars['String']['input'];
};


export type QueryAgvAllInscriptionsByPageArgs = {
  data: AgvInscriptionPageInput;
};


export type QueryAgvGetAllClassEventsArgs = {
  type: Scalars['String']['input'];
};


export type QueryAgvGetContentHistoryArgs = {
  id: Scalars['Float']['input'];
};


export type QueryAgvGetEventArgs = {
  id: Scalars['Float']['input'];
  urlApi: Scalars['String']['input'];
};


export type QueryAgvGetNewsletterInscriptionByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryAgvGetNewsletterInscriptionsPageArgs = {
  data: AgvNewsletterInscriptionPageInput;
};


export type QueryAgvGetNewsletterInscriptionsResendStatusArgs = {
  data: AgvNewsletterInscriptionSendEmailStatusInput;
};


export type QueryAgvGetNewsletterMessageByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryAgvGetNewsletterMessagesPageArgs = {
  data: AgvNewsletterMessagePageInput;
};


export type QueryAgvGetNextEventsArgs = {
  urlApi: Scalars['String']['input'];
};


export type QueryDeleteMediaFilesArgs = {
  id: Scalars['Float']['input'];
};


export type QueryExportTranslationsArgs = {
  data: ExportTranslationInput;
};


export type QueryGetAllTranslationsArgs = {
  data: GetAllTranslationInput;
};


export type QueryGetAllTranslationsByKeysArgs = {
  data: GetTranslationByKeysInput;
};


export type QueryGetEventHistoryArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetFinanceIssuesArgs = {
  data: FinanceIssuesPageInput;
};


export type QueryGetHistoricPageArgs = {
  data: HistoricPageInput;
};


export type QueryGetIndexContentArgs = {
  urlApi: Scalars['String']['input'];
};


export type QueryGetLanguageArgs = {
  data: IdInput;
};


export type QueryGetMediaFileArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetStorageByPaginationArgs = {
  data: StoragePageInput;
};


export type QueryGetStorageByTypeArgs = {
  data: StorageAllInput;
};


export type QueryGetTemplateByTypeArgs = {
  type: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  data: IdInput;
};


export type QueryGetUserAllHistoricByUserArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserHistoricArgs = {
  id: Scalars['Float']['input'];
};


export type QueryMeArgs = {
  data: MeInput;
};


export type QuerySendEmailArgs = {
  data: WgEmailInput;
};


export type QuerySendEmailFromToAddressAndAppArgs = {
  data: WgEmailToAddressAndAppInput;
};


export type QuerySendEmailFromToAppArgs = {
  data: WgEmailFromToAppInput;
};


export type QuerySendEmailToAppArgs = {
  data: WgEmailToAppInput;
};


export type QueryValidUserNameArgs = {
  data: ValidUserNameInput;
};

export type RegisterInput = {
  address?: Scalars['String']['input'];
  cap?: Scalars['String']['input'];
  certificate?: Scalars['String']['input'];
  code?: Scalars['String']['input'];
  email: Scalars['String']['input'];
  isEmailConfirmed?: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: Scalars['String']['input'];
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
  userName: Scalars['String']['input'];
};

export type ResendConfirmationInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SetTranslationInput = {
  translation?: InputMaybe<TranslationInput>;
  translations?: InputMaybe<Array<TranslationInput>>;
};

export type SettingsResponse = {
  __typename?: 'SettingsResponse';
  key: Scalars['String']['output'];
  type_settings: Scalars['String']['output'];
  value: SettingsValueResponse;
};

export type SettingsValueResponse = {
  __typename?: 'SettingsValueResponse';
  type: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type StorageAllInput = {
  lang: Scalars['Float']['input'];
  loadTranslations?: Scalars['Boolean']['input'];
  search?: Scalars['String']['input'];
  type: Scalars['String']['input'];
  urlApi: Scalars['String']['input'];
};

export type StorageInput = {
  content: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  image?: InputMaybe<Scalars['Float']['input']>;
  imageList?: InputMaybe<Array<Scalars['Float']['input']>>;
  type: Scalars['String']['input'];
};

export type StoragePageInput = {
  descending?: Scalars['Boolean']['input'];
  lang: Scalars['Float']['input'];
  loadTranslations?: Scalars['Boolean']['input'];
  search?: Scalars['String']['input'];
  skip?: Scalars['Float']['input'];
  sortBy?: Scalars['String']['input'];
  take?: Scalars['Float']['input'];
  type: Scalars['String']['input'];
  urlApi: Scalars['String']['input'];
};

export type StoragePageResponse = {
  __typename?: 'StoragePageResponse';
  storageItems: Array<StorageResponse>;
  storageItemsCount: Scalars['Float']['output'];
};

export type StorageResponse = {
  __typename?: 'StorageResponse';
  content: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  image?: Maybe<MediaResponse>;
  imageList?: Maybe<Array<MediaResponse>>;
  type: Scalars['String']['output'];
};

export type TemplateInput = {
  body: Scalars['String']['input'];
  documentType: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  title: Scalars['String']['input'];
};

export type TemplateResponse = {
  __typename?: 'TemplateResponse';
  body: Scalars['String']['output'];
  documentType: Scalars['String']['output'];
  id?: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
};

export type TranslationInput = {
  key: Scalars['String']['input'];
  languageId: Scalars['Float']['input'];
  value: Scalars['String']['input'];
};

export type TranslationResponse = {
  __typename?: 'TranslationResponse';
  id: Scalars['String']['output'];
  key: Scalars['String']['output'];
  languageId: Scalars['Float']['output'];
  value: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  address?: Maybe<Scalars['String']['output']>;
  cap?: Maybe<Scalars['String']['output']>;
  certificate?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  isEmailConfirmed: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
  userName: Scalars['String']['output'];
};

export type ValidUserNameInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  userName: Scalars['String']['input'];
};

export type WgEmailFromToAppInput = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type WgEmailInput = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type WgEmailToAddressAndAppInput = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type WgEmailToAppInput = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['String']['input']>;
  from: Scalars['String']['input'];
  subject: Scalars['String']['input'];
};
