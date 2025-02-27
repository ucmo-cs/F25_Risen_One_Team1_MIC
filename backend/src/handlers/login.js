'use strict';

const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamoDb = new DynamoDBClient();

const CORS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
};

module.exports.handler = async event => {
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
        ...CORS,
        body: JSON.stringify({ message: 'Invalid username or password' })
      };
    }

    return {
      statusCode: 200,
      ...CORS,
      body: JSON.stringify({ message: 'Login successful' })
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      ...CORS,
      body: JSON.stringify({ message: error.message || 'Internal server error' })
    };
  }
};
