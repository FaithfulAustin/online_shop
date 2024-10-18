/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */



import axios, { Method } from 'axios';






export const ApiService = async (

    requestData: Record<string, any> | null | string,  // Allow null for GET requests where no data is sent. 
    path: string,
    headers: Record<string, string>,
    method: Method = 'POST'  // Default to 'POST', but can be set to 'GET'
) => {
    const baseUrl = "http://localhost:4000"
    try {
        let response;
        if (method === 'POST') {
            requestData;

            // const data = encryptData(requestData); // Non-null assertion since requestData is required for POST

            response = await axios.post(`${baseUrl}/${path}`, requestData, { headers });


        } else if (method === 'GET') {
            const params = requestData || {};  // For GET, we use requestData as query params
            response = await axios.get(`${baseUrl}/${path}`, { headers, params });
        } else {
            throw new Error(`Unsupported method: ${method}`);
        }

        if (response.status === 200) {
            return response
        } else {
            // return response.
            return "Error: Unexpected response status";
        }
    } catch (error: any) {
        // Optional: log the error or handle it in a specific way

        return error.response;


        return `Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`;
    }
};
