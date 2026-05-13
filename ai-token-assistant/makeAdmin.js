import mongoose from 'mongoose';
import User from './models/user.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOneAndUpdate(
      { email },
      { role: 'admin' },
      { new: true }
    );
    
    if (user) {
      console.log(`Successfully updated ${email} to admin role.`);
    } else {
      console.log(`User ${email} not found.`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
};

const emailArg = process.argv[2];
if (!emailArg) {
  console.log('Please provide an email address. Example: node makeAdmin.js one@gmail.com');
  process.exit(1);
}

makeAdmin(emailArg);
