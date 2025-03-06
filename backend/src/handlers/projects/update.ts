'use strict';

import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { createResponse } from '../../utils.js';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { z } from 'zod';

const dynamoDb = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDb);

const projectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  years: z.record(
    z.number(),
    z.record(
      z.number(),
      z.object({
        employees: z.array(
          z.object({
            username: z.string(),
            hours: z.array(z.number())
          })
        )
      })
    )
  )
});

export const handler = async event => {
  try {
    const projects = z.array(projectsSchema).parse(JSON.parse(event.body));

    console.log(projects);
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
