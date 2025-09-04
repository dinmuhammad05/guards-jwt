import * as jwt from 'jsonwebtoken';



export async function generateToken(payload: any): Promise<string> {
  console.log('dangg',payload);
  
    return jwt.sign(payload, String(process.env.JWT_KEY), {
      expiresIn: '1h',
    });
  }



