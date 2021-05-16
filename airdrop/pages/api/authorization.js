// Next.js API route support: https://nextjs.org/
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import Web3 from 'web3';
import { connectToDatabase } from '../../lib/mongodb'


export default async (req, res) => {
  const url = process.env.MONGODB_URI
  const recipientSchema = new mongoose.Schema({
    name: String,
    DiscordId: String,
    address: String,
    basicAllocation: String,
    totalAllocation: String,
    time: String
  });
  
  const { db } = await connectToDatabase();
  
  
  const data = await db.collection("recipients").findOne({$text: { $search:  req.body.address }})
   //1. get record
  
    
   const Recipient = mongoose.models.Recipient || mongoose.model(
    'Recipient', 
    recipientSchema, 
    'recipients'
  );
  //2. if record found, return signature
  
  if(data) {
    const message = Web3.utils.soliditySha3(
      {t: 'address', v: data.address },
      {t: 'uint256', v: data.totalAllocation }
    ).toString('hex');
    const web3 = new Web3('');
    const { signature } = web3.eth.accounts.sign(
      message, 
      process.env.PRIVATE_KEY
    );
    res
      .status(200)
      .json({ 
        address: req.body.address, 
        basicAllocation: data.basicAllocation,
        totalAllocation: data.basicAllocation,
        signature
      });
    return;
  }
  //3. otherwise, return error
  res
    .status(404)
    .json({ address: req.body.address});
}

