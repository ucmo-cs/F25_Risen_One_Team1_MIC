'use strict';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { createResponse } from '../../utils.js';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async () => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: process.env.USERS_TABLE }));
    data.Items?.forEach(i => {
      delete i.password;
    });

    return createResponse(200, data.Items);
  } catch (error) {
    console.error('Error:', error);

    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
