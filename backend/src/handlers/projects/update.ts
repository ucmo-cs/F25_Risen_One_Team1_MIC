import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../../utils.js';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { projectsSchema } from '@senior-project/shared/src/types.js';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async event => {
  try {
    const projects = z.array(projectsSchema).parse(JSON.parse(event.body));

    console.log(projects);

    return createResponse(200, { message: 'successful' });
  } catch (error) {
    console.error('Error:', error);
    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
