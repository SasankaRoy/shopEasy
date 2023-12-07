import Cors from 'cors';

const cors = Cors(
    {
        methods:['GET', 'HEAD'],
    }
);

function socketMiddleware(middle){
    return (req,res) => 
    new Promise((resolve,reject) =>{
        middle(req,res,(result)=>{
            if (result instanceof Error) {
                return reject(result);
              }      
              return resolve(result);
        })
    })
}

export default socketMiddleware;