import serverless from 'serverless-http';
import { apiApp } from '../../server/apiApp.js';

export const handler = serverless(apiApp);
