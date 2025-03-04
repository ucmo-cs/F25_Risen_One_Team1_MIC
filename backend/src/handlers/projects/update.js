'use strict';

import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../utils.js';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

export const handler = async event => {
  try {
    const projects = JSON.parse(event.body);
    if (!Array.isArray(projects)) throw new Error('Invalid payload');

    const params = {
      TableName: process.env.PROJECTS_TABLE,
      Key: {
        username: { S: requestBody.username }
      }
    };

    const data = await dynamoDb.send(new UpdateItemCommand(params));

    if (!data.Item || data.Item.password.S !== requestBody.password) {
      return createResponse(401, { message: 'Invalid username or password' });
    }

    return createResponse(200, { message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
