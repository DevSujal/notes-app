import { Account, Client, Functions, ID } from "appwrite";
import { conf } from "../../config";

export class Auth {
  client = new Client();
  account;
  functions;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
    this.functions = new Functions(this.client);
  }

  async createAcount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async login({ email, password }) {
    try {
      console.log(this.account, "||", this.client);
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw Error(`${error}`);
    }
  }

  async generateEnhancedNote(inputText) {
    try {
      // Ensure valid session
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error("No Current User!")
      }

      // Call Appwrite function
      const execution = await this.functions.createExecution(
        conf.appWriteFunctionId, // Replace with your function ID
        JSON.stringify({ input: inputText }),
        false // Set to true for async execution
      );

      const response = JSON.parse(execution.responseBody);

      if (response) {
        return response.enhancedText;
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Generation failed:", error);
      throw error;
    }
  }
}

const auth = new Auth();

export default auth;
