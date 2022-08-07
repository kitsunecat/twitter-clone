import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type TweetMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Tweet {
  readonly id: string;
  readonly content: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tweet, TweetMetaData>);
  static copyOf(source: Tweet, mutator: (draft: MutableModel<Tweet, TweetMetaData>) => MutableModel<Tweet, TweetMetaData> | void): Tweet;
}