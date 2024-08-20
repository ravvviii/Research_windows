import { Account, Client, Databases, Storage } from 'appwrite';

const client = new Client();

client.setEndpoint(process.env.REACT_APP_ENDPOINT).setProject(process.env.REACT_APP_PROJECT_ID);


export const account = new Account(client)
export const database = new Databases(client)
export const storage = new Storage(client)