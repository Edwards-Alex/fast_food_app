import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.fym.foodordering",
    databaseId: "689e60090037b5be4f8a",
    bucketId:"68ae53b70016d5873b8f",
    userCollectionId: "689e6041000d3639d6de",
    categoriesCollectionId: "68a6c19700130b280652",
    menuCollectionId: "68a6c2a600057327dd6e",
    customizationsCollectionId: "68a6c622003a12fc73bf",
    menuCustomizationsCollectionId:"68a7047c0003763fc1c1"
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async({email, password, name}: CreateUserPrams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)

        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarsUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarsUrl}
        )
    } catch (error) {
        throw new Error( error as string);
    }
}

export const signIn= async({email, password}: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw new Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId',currentAccount.$id)]
        )

        if(!currentUser) throw new Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error as string);
    }
}

export const getMenu = async({ category, query}: GetMenuParams) => {
    try {
        const queries: string[] = [];
        
        if(category) queries.push(Query.equal('category', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCategories = async() => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )
        return categories.documents;
    } catch (error) {
        throw new Error(error as  string);
    }
}