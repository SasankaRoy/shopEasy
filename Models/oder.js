import mongoose from 'mongoose';

const OderSchema = new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    userName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        require:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    alternativePhoneNumber:{
        type:Number,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    itemList:{
        type:Array,
        required:true,
    },
    status:{
        type:String,
        default:'pending',
    }

},{timestamps:true});

export default mongoose.models.Oder || mongoose.model('Oder',OderSchema)