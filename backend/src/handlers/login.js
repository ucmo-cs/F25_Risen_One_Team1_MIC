'use strict';

const { DynamoDBClient, GetItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamoDb = new DynamoDBClient();

module.exports.handler = async event => {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      username: { S: requestBody.username }
    }
  };

  try {
    const data = await dynamoDb.send(new GetItemCommand(params));

    if (!data.Item || data.Item.password.S !== requestBody.password) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Invalid username or password' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
