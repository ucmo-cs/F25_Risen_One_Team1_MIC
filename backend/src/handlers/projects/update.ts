import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../../utils';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';
import { projectsSchema } from '@senior-project/shared/src/types.js';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const projects = z.array(projectsSchema).parse(JSON.parse(event.body || ''));

    const promises = projects.map(proj => {
      return docClient.send(new PutCommand({ TableName: process.env.PROJECTS_TABLE, Item: proj }));
    });

    await Promise.all(promises);

    return createResponse(200, { message: 'Updated' });
  } catch (error) {
    console.error('Error:', error);
    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
