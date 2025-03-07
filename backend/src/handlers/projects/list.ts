import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../../utils';
import type { APIGatewayProxyResult } from 'aws-lambda';
import { z } from 'zod';
import { projectsSchema } from '@shared/types';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: process.env.PROJECTS_TABLE }));

    return createResponse(200, z.array(projectsSchema).parse(data.Items)); // Parse so it coerces fields
  } catch (error) {
    console.error('Error:', error);

    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
