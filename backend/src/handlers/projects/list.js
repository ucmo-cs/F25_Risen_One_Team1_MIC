'use strict';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

const HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  }
};

export const handler = async () => {
  try {
    const data = await docClient.send(new ScanCommand({ TableName: process.env.PROJECTS_TABLE }));

    return {
      statusCode: 200,
      ...HEADERS,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      ...HEADERS,
      body: JSON.stringify({ message: error.message || 'Internal server error' })
    };
  }
};
