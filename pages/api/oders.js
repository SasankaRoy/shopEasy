import connectDB from "../../utils/connectDb";
import Oder from '../../Models/oder'

const handleGetOders = async (req, res) => {

    try {

        const getAllOders = await Oder.find();

        if (getAllOders) {
            res.status(200).json({ orderList: getAllOders });
            return;
        }

        res.status(404).json({ noOder: 'there are no orders yet !' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
const handlePostOders = async (req, res) => {
    try {
        const { oder, productIds, userId, subTotal } = req.body;

        // first save the oder details........

        const newOder = await new Oder({
            userId,
            userName: oder.fullName,
            email: oder.email,
            address: oder.fullAddress,
            phoneNumber: oder.phoneNumber,
            alternativePhoneNumber: oder.alternatePhoneNumber,
            country: oder.country,
            paymentMethod: oder.payMethod,
            totalPrice: subTotal,
            itemList: productIds
        });

        // save the oder details........

        const oderSaved = await newOder.save();

        console.log(oderSaved, 'oderSaved successfuly');

        res.status(200).json({ success: oderSaved });


        // console.log(oder, productIds, userId, subTotal);


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error})
    }

}

const handlePutOders = async (req, res) => { }

const handleDeleteOders = async (req, res) => { }


export default async function handler(req, res) {    
    connectDB();
    switch (req.method) {
        case 'GET':
            await handleGetOders(req, res);
            break;
        case 'POST':
            await handlePostOders(req, res);
            break;
        case 'PUT':
            await handlePutOders(req, res);
            break;
        case 'DELETE':
            await handleDeleteOders(req, res);
            break;
        default:
            await handleGetOders(req, res);
            break;
    }
}

