import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../../utils.js';
import { projectsSchema } from '@shared/types';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async () => {
  try {
    console.log(projectsSchema);
    const data = await docClient.send(new ScanCommand({ TableName: process.env.PROJECTS_TABLE }));

    return createResponse(200, data.Items);
  } catch (error) {
    console.error('Error:', error);

    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
