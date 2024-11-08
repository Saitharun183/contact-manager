import mongoose from 'mongoose';

export class DBUtil {
    public static async connectToDB(dbUrl: string, dbName: string): Promise<string> {
        try {
            await mongoose.connect(dbUrl, {dbName});
            return "Connected to DB.";
        } catch (error: any) {
            return `Connection Error: Could not connect to DB. ${error.message || error}`;
        }
    }
}
