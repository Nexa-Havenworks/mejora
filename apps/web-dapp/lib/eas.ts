import { GraphQLClient } from 'graphql-request'

export const API_URL = 'https://base-goerli.easscan.org'

export const graphQLClient = new GraphQLClient(API_URL, { fetch })