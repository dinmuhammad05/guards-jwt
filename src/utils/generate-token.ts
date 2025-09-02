import * as jwt from 'jsonwebtoken';



export async function generateToken(payload: any): Promise<string> {
    return jwt.sign(payload, String(process.env.JWT_KEY), {
      expiresIn: '1h',
    });
  }



