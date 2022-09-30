import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TweetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly email?: string | null;
  readonly name?: string | null;
  readonly Tweets?: (Tweet | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Tweet {
  readonly id: string;
  readonly content: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tweet, TweetMetaData>);
  static copyOf(source: Tweet, mutator: (draft: MutableModel<Tweet, TweetMetaData>) => MutableModel<Tweet, TweetMetaData> | void): Tweet;
}