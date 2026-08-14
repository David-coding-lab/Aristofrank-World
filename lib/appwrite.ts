import { Client, Account, Databases, Functions, Storage } from "appwrite"
import { env } from "@/lib/env"

const client = new Client()
  .setEndpoint(env.appwrite.endpoint)
  .setProject(env.appwrite.projectId)

// Exposed for realtime subscriptions (client.subscribe) from client components.
export { client }
export const account = new Account(client)
export const databases = new Databases(client)
export const functions = new Functions(client)
export const storage = new Storage(client)
export { ID } from "appwrite"
