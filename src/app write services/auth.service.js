import { Account, Client, ID } from "appwrite";
import { conf } from "../../config";

export class Auth {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
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
      console.log("createAccount is not working appwrite service : ", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(
        email,
        password
      );
    } catch (error) {
      console.log("login is not working appwrite service : ", error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("logout is not working appwrite service : ", error);
    }
  }

  async getCurrentUser() {
    try {
        return await this.account.get()
    } catch (error) {
      console.log("getCurrentUser is not working appwrite service : ", error);
    }
  }
}

const auth = new Auth()

export default auth;
