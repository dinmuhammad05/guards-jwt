import { IsuccessRes } from "src/interfaces/success-res";

export const getSuccessRes = (data:object, statusCode= 200):IsuccessRes =>{
    return {
        statusCode,
        message:'success',
        data
    }
}