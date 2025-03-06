import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../../utils';
import { projectsSchema } from '@shared/types';
import type { APIGatewayProxyResult } from 'aws-lambda';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);
const ab: number = 'f';

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    console.log(projectsSchema, ab);
    const data = await docClient.send(new ScanCommand({ TableName: process.env.PROJECTS_TABLE }));

    return createResponse(200, data.Items);
  } catch (error) {
    console.error('Error:', error);

    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
