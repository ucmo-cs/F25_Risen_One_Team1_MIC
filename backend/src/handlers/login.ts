import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../utils';
import { z, ZodError } from 'zod';

const dynamoDb = new DynamoDBClient();

const loginSchema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
  password: z.string().trim().min(1, 'Password is required')
});

export const handler = async event => {
  try {
    const { username, password } = loginSchema.parse(JSON.parse(event.body));

    const params = {
      TableName: process.env.USERS_TABLE,
      Key: {
        username: { S: username }
      }
    };

    const data = await dynamoDb.send(new GetItemCommand(params));

    if (!data.Item || data.Item.password.S !== password) {
      return createResponse(401, { message: 'Invalid username or password' });
    }

    return createResponse(200, { message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);

    if (error instanceof ZodError) return createResponse(400, { message: error.errors[0].message || 'Bad request' });

    return createResponse(500, { message: error.message || 'Internal server error' });
  }
};
