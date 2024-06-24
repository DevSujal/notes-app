export const conf = {
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECTID),
    appWriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASEID),
    appWriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTIONID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKETID)
}