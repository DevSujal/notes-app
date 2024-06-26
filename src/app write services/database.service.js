import { Client, Databases, Query } from "appwrite";
import { conf } from "../../config";

export class Database{
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.database = new Databases(this.client);
  }

  createUrlFromTitle(title = "") {
    try {
      return title.toLowerCase().replaceAll(" ", "-");
    } catch (error) {
      console.log(
        "createUrlFromTitle is not working appwrite service : ",
        error
      );
    }
  }

  async createNote({ title, content, $id }) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        this.createUrlFromTitle(title),
        {
          title,
          content,
          userId : $id,
          date : String(Date(Date.now())).substring(4, 24)
        }
      );
    } catch (error) {
      console.log("createNote is not working appwrite service : ", error);
    }
  }

  async updataNote({ title, content, url, $id}){
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        url,
        {
          title,
          content,
          $id,
          date : String(Date(Date.now())).substring(4, 24)
        }
      );
    } catch (error) {
      console.log("updateNote is not working appwrite service : ", error);
    }
  }

  async deleteNote( url ) {
    try {
      return await this.database.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        url
      );
    } catch (error) {
      console.log("deleteNote is not working appwrite service : ", error);
    }
  }

  async getNote( url ) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        url
      );
    } catch (error) {
      console.log("getNote is not working appwrite service : ", error);
    }
  }

  async getAllNotes({$id}) {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        [Query.equal("userId", $id)]
      );
    } catch (error) {
      console.log("getAllNotes is not working appwrite service : ", error);
    }
  }
}

const database = new Database()

export default database
