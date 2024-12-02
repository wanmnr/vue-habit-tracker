// src/mocks/utils.ts
export const mockApiDelay = (ms: number = 1000) => 
    new Promise(resolve => setTimeout(resolve, ms));
  
  export const mockApiResponse = <T>(data: T) => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json'
    }
  });
  
  export const mockApiError = (message: string, status: number = 400) => ({
    response: {
      data: { message },
      status,
      statusText: status === 400 ? 'Bad Request' : 'Internal Server Error'
    }
  });