const { MongoClient } = require('mongodb');

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}/`;

class DBClient {
  constructor() {
    this.db = null;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(database);
      await this.db.createCollection('users');
      await this.db.createCollection('files');
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbFiles() {
    try {
      const fileCollection = this.db.collection('files');
      const count = await fileCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error in nbFiles: ${error}`);
      throw error;
    }
  }

  async nbUsers() {
    try {
      const userCollection = this.db.collection('users');
      const count = await userCollection.countDocuments();
      return count;
    } catch (error) {
      console.error('Error in nbUsers:', error);
      throw error;
    }
  }
}

module.exports = DBClient;
