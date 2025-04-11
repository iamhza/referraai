
# AWS API Integration Guide

This guide explains how to set up the AWS API integration for the Referra application.

## Prerequisites

1. An AWS account with permissions to create and manage API Gateway and Lambda resources
2. AWS CLI installed and configured on your development machine

## Set Up AWS API Gateway & Lambda

### 1. Create a Lambda Function

1. Log in to AWS Console and go to Lambda service
2. Click "Create function"
3. Choose "Author from scratch"
4. Name your function (e.g., "referra-clients-api")
5. Choose runtime (e.g., Node.js 16.x)
6. Create or select an execution role with basic Lambda permissions
7. Click "Create function"
8. In the function code editor, enter your code to fetch client data (example below)

```javascript
// Example Lambda function for returning client data
exports.handler = async (event) => {
    // In a real application, you would fetch this from DynamoDB or another database
    const clients = [
        { id: '1', name: 'John Smith', status: 'active', activeReferrals: 2, lastUpdated: '2d ago' },
        { id: '2', name: 'Maria Johnson', status: 'pending', activeReferrals: 1, lastUpdated: '4h ago' },
        { id: '3', name: 'Robert Chen', status: 'completed', activeReferrals: 0, lastUpdated: '1w ago' },
        { id: '4', name: 'Fatima Ali', status: 'urgent', activeReferrals: 3, lastUpdated: '1h ago' },
        { id: '5', name: 'James Wilson', status: 'active', activeReferrals: 1, lastUpdated: '3d ago' },
    ];
    
    // Check if we're looking for a specific client
    if (event.pathParameters && event.pathParameters.id) {
        const client = clients.find(c => c.id === event.pathParameters.id);
        if (!client) {
            return {
                statusCode: 404,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ message: "Client not found" })
            };
        }
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(client)
        };
    }
    
    // Return all clients
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(clients)
    };
};
```

### 2. Create API Gateway

1. Go to API Gateway service
2. Click "Create API"
3. Select "REST API" and click "Build"
4. Choose "New API" and name it (e.g., "referra-api")
5. Click "Create API"
6. Create a resource by clicking "Actions" -> "Create Resource"
7. Name it "clients" and click "Create Resource"
8. Create a GET method by clicking "Actions" -> "Create Method"
9. Select "GET" and click the checkmark
10. Configure the GET method:
    - Integration type: Lambda Function
    - Use Lambda Proxy integration: Yes
    - Lambda Function: referra-clients-api
    - Click "Save"
11. Create another resource under "clients" with path parameter "{id}"
12. Add a GET method for this resource as well, pointing to the same Lambda

### 3. Deploy API

1. Click "Actions" -> "Deploy API"
2. Create a new stage (e.g., "dev")
3. Click "Deploy"
4. Note the "Invoke URL" that appears - this is your API endpoint

### 4. Configure CORS

1. Select each resource and method
2. Click "Actions" -> "Enable CORS"
3. Click "Enable CORS and replace existing CORS headers"

### 5. Configure API Security

Choose one of these options:

#### Option A: API Key

1. Click "API Keys" -> "Create API Key"
2. Name your key and click "Save"
3. Go to "Usage Plans" -> "Create"
4. Create a usage plan with appropriate throttling and quota settings
5. Add your API stage to the usage plan
6. Associate your API key with the usage plan

#### Option B: IAM Authentication

1. Modify your Lambda integration to use IAM authentication
2. Update the client code to use AWS Signature V4 signing

## Frontend Configuration

1. Create a `.env` file in your project root with:

```
VITE_AWS_API_URL=https://your-api-id.execute-api.your-region.amazonaws.com/dev
```

2. If using API Key authentication, you would add:

```
VITE_AWS_API_KEY=your-api-key
```

3. For IAM authentication, you'll need to set up AWS Cognito or another authentication method and add the required credentials.

## Deployment Considerations

- In a real-world scenario, consider using a CI/CD pipeline for deployment
- Use different API stages for development, staging, and production
- Secure all endpoints properly with appropriate authorization
