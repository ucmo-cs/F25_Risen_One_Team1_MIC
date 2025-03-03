'use strict';

import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../utils.js';

const dynamoDb = new DynamoDBClient();

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
      return createResponse(401, { message: 'Invalid username or password' });
    }

    return createResponse(200, { message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
