import axios from 'axios';
import * as fs from 'fs';

export async function uploadTestResults() {
  try {
    console.log('Reading test results from file...');
    // Read the test results from the JSON file in the parent directory
    const testResults = fs.readFileSync('playwright-results.json', 'utf8');
    console.log('Test results read successfully:', testResults);

    console.log('Uploading test results to Squash TM...');
    // Make a POST request to upload the test results to Squash TM with authentication
    const response = await axios.post('http://localhost:8080/squash/api/rest/latest', testResults, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
      }
    });

    console.log('Test results uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading test results:', error);
  }
}
