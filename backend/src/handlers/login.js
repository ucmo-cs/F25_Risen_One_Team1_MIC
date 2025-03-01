'use strict';

import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamoDb = new DynamoDBClient();

const HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
  }
};

export const handler = async event => {
  try {
    const requestBody = JSON.parse(event.body);
    if (!requestBody.username || !requestBody.password) throw new Error('Username and password required');

    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        username: { S: requestBody.username }
      }
    };

    const data = await dynamoDb.send(new GetItemCommand(params));

    if (!data.Item || data.Item.password.S !== requestBody.password) {
      return {
        statusCode: 401,
        ...HEADERS,
        body: JSON.stringify({ message: 'Invalid username or password' })
      };
    }

    return {
      statusCode: 200,
      ...HEADERS,
      body: JSON.stringify({ message: 'Login successful' })
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
