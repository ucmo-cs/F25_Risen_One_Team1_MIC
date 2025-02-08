## Prerequisites

Before you start, ensure you have the following:

- **AWS CLI**: Install and configure the AWS Command Line Interface with your account details. Instructions can be found [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).
- **Node.js and npm**: Install Node.js and npm from [here](https://nodejs.org/).

## Inital Setup

- Run `npm i` in the project root folder
- Open visual studio code in the root folder
- Install Prettier extension as recommended

## Run the Development Server

Start the development server to preview the Angular application locally.

- In `frontend/` folder, run `npm run start`

# Deploy Application

- In the `frontend/` folder, run `npm run build` to update the static frontend files
- In the root folder, run `sls deploy`
- This will deploy the frontend to S3 and the backend lambda functions
- Use `sls deploy --stage prod` to deploy production version

# Info:

## Backend (AWS Lambda & DynamoDB):

- API Gateway: This AWS service acts as the entry point for API requests from the Angular application. It routes HTTP requests to the appropriate Lambda function.
- AWS Lambda Functions: These are serverless compute services that run your backend code in response to HTTP requests from the API Gateway. Each Lambda function can correspond to different operations like CRUD (Create, Read, Update, Delete) on data. The functions are typically written in Node.js, Python, or another supported runtime.
- Example: A Lambda function might handle a POST request to create a new item in DynamoDB, or a GET request to retrieve data.
- Amazon DynamoDB: Used as the database for storing and retrieving data. Lambda functions interact with DynamoDB to perform database operations:
  - Create: New entries are added when the user submits data via a form in the Angular app.
  - Read: Data is fetched to populate views or lists in the frontend.
  - Update/Delete: Modifications or deletions are made based on user actions.

## Integration Flow:

- User Interaction: A user interacts with an Angular component (e.g., submits a form).
- Service Call: The component uses an Angular service to make an HTTP request.
- API Gateway: The request goes through API Gateway, which routes it to the correct Lambda function.
- Lambda Function: This function processes the request, potentially interacting with DynamoDB.
- DynamoDB: Reads from or writes to the database.
- Response: The Lambda function sends back a response via API Gateway to the Angular application.
- Data Handling: The Angular service receives this data and updates the component's view accordingly.
