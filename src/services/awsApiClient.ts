
// AWS API configuration
const API_URL = import.meta.env.VITE_AWS_API_URL || "https://nndjr3excb.execute-api.us-east-2.amazonaws.com/dev";
const API_KEY = import.meta.env.VITE_AWS_API_KEY || "";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ClientData {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'completed' | 'urgent';
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  notes?: string;
  dateOfBirth?: string;
  accessibilityNeeds?: string[];
  insuranceType?: string;
  medicalNotes?: string;
  serviceId?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  culturalNeeds?: string[] | string;
  languagePreferences?: string[];
  caseManagerId?: string;
  caseManagerName?: string;
  organization?: string;
  activeReferrals: number;
  lastUpdated: string;
  first_name?: string;
  last_name?: string;
}

/**
 * Helper function to make authenticated requests to the AWS API Gateway
 */
async function makeApiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body?: any
): Promise<ApiResponse<T>> {
  try {
    if (!API_URL && !endpoint.startsWith('http')) {
      console.error("AWS API URL not configured");
      return { success: false, error: "API URL not configured. Please add VITE_AWS_API_URL to your environment." };
    }
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    // Add API key if available
    if (API_KEY) {
      headers["x-api-key"] = API_KEY;
    }

    const requestOptions: RequestInit = {
      method,
      headers,
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send cookies for cross-origin requests
    };

    // Add body for non-GET requests
    if (body && method !== 'GET') {
      // Ensure array fields are properly formatted
      if (body.culturalNeeds && typeof body.culturalNeeds === 'string') {
        body.culturalNeeds = [body.culturalNeeds];
      }
      
      // Format other potential array fields if needed
      ['accessibilityNeeds', 'languagePreferences'].forEach(field => {
        if (body[field] && !Array.isArray(body[field])) {
          body[field] = [body[field]];
        }
      });
      
      requestOptions.body = JSON.stringify(body);
    }
    
    // Make the API request
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
    console.log(`Making ${method} request to: ${url}`);
    console.log('Request options:', JSON.stringify(requestOptions));
    
    try {
      const response = await fetch(url, requestOptions);
      
      // Log detailed information about the response
      console.log(`Response status: ${response.status} ${response.statusText}`);
      console.log('Response headers:', [...response.headers.entries()]);
      
      // Check if response is valid
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error ${response.status}: ${errorText}`);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      // Parse the response as JSON
      const data = await response.json();
      console.log('Response data:', data);
      
      // Special handling for Lambda errors that return 200 status but contain error information
      if (data && data.errorType && data.errorMessage) {
        console.error('Lambda function error:', data);
        return { 
          success: false, 
          error: `Lambda function error: ${data.errorMessage}`,
          data: data // Still include the data for debugging
        };
      }
      
      // Handle AWS Lambda specific response format
      // Lambda proxy integration returns { statusCode, headers, body } format
      if (data && data.statusCode && data.body) {
        console.log('Lambda proxy response detected:', data);
        
        // If statusCode indicates an error, handle it accordingly
        if (data.statusCode >= 400) {
          let errorMessage = "Unknown error";
          try {
            // Parse the body if it's a string
            const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
            errorMessage = parsedBody.message || parsedBody.error || "API returned an error";
          } catch (e) {
            console.error('Error parsing Lambda response body:', e);
          }
          
          return {
            success: false,
            error: `Lambda returned error (${data.statusCode}): ${errorMessage}`,
            data: data // Include the full data for debugging
          };
        }
        
        // For successful responses, try to parse the body
        try {
          const parsedBody = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
          return { success: true, data: parsedBody };
        } catch (e) {
          console.error('Error parsing Lambda success response body:', e);
          return { success: true, data: data.body as unknown as T };
        }
      }
      
      return { success: true, data };
    } catch (fetchError) {
      console.error('Fetch error details:', fetchError);
      
      // More detailed diagnostics for network errors
      if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
        console.error('Network error - possible causes:');
        console.error('1. CORS policy blocking the request');
        console.error('2. API Gateway not properly configured for CORS');
        console.error('3. Network connectivity issues');
        console.error('4. API URL is incorrect or service is down');
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error(`API request failed:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
}

/**
 * AWS API client service for making authenticated requests to API Gateway
 */
export const awsApiClient = {
  /**
   * Test connection to the API
   */
  async testConnection(): Promise<ApiResponse<{message: string}>> {
    // Just perform a simple GET request to see if we can reach the API
    return await makeApiRequest<{message: string}>('/', 'GET');
  },

  /**
   * Fetch clients from AWS API
   */
  async getClients(): Promise<ApiResponse<ClientData[]>> {
    return await makeApiRequest<ClientData[]>('/clients');
  },

  /**
   * Get a single client by ID
   */
  async getClient(id: string): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>(`/clients/${id}`);
  },

  /**
   * Get a client by the ID returned from test insertion
   * This is specific to the test API endpoint
   */
  async getTestClient(id: string): Promise<ApiResponse<ClientData>> {
    const testEndpoint = `https://qcxg71ospg.execute-api.us-east-2.amazonaws.com/getClientData?id=${id}`;
    return await makeApiRequest<ClientData>(testEndpoint);
  },

  /**
   * Create a new client
   */
  async createClient(clientData: Omit<ClientData, 'id' | 'lastUpdated' | 'activeReferrals'>): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>('/clients', 'POST', clientData);
  },

  /**
   * Update an existing client
   */
  async updateClient(id: string, clientData: Partial<ClientData>): Promise<ApiResponse<ClientData>> {
    return await makeApiRequest<ClientData>(`/clients/${id}`, 'PUT', clientData);
  },

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<ApiResponse<void>> {
    return await makeApiRequest<void>(`/clients/${id}`, 'DELETE');
  },
  
  /**
   * Test the AWS API with customizable client data
   */
  async testApiEndpoint(payload = {
    name: "Jane Doe",
    dateOfBirth: "1990-01-01",
    email: "jane@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "Minneapolis",
    state: "MN",
    zipcode: "55401",
    accessibilityNeeds: ["Wheelchair"],
    insuranceType: "Medicaid",
    medicalNotes: "Asthma",
    urgency: "high",
    culturalNeeds: ["Halal meals"],
    languagePreferences: ["Somali", "English"]
  }): Promise<ApiResponse<any>> {
    // Make the endpoint configurable
    const testEndpoint = import.meta.env.VITE_AWS_TEST_ENDPOINT || "/insertClientData";
    const url = testEndpoint.startsWith('http') ? testEndpoint : `${API_URL}${testEndpoint}`;
    
    console.log(`Using test endpoint: ${url}`);
    return await makeApiRequest<any>(url, 'POST', payload);
  }
};
