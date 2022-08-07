// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Tweet } = initSchema(schema);

export {
  Tweet
};