// src/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function authMiddleware(handler: (req: NextRequest, token: string) => Promise<NextResponse>, requireAdmin: boolean = false) {
  return async (req: NextRequest) => {
    const token = req.cookies.get('jwt')?.value || req.headers.get('authorization');
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, secret as string) as any;
      if (requireAdmin && !decoded.isAdmin) {
        return NextResponse.json({ message: 'Admin access required' }, { status: 403 });
      }
      (req as any).user = decoded;
      return handler(req, token);
    } catch (err) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  };
}






// import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
// import jwt from 'jsonwebtoken';

// interface DecodedToken {
//   user_id: number;
//   username: string;
//   isAdmin: boolean;
//   exp: number;
// }

// export const authMiddleware = (handler: NextApiHandler, requireAdmin = false) => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const token = req.cookies['jwt'] || req.headers['authorization'];
//     const secret = process.env.NEXT_PUBLIC_JWT_SECRET;

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//       const decoded = jwt.verify(token, secret as string) as DecodedToken;
//       (req as any).user = decoded;

//       if (requireAdmin && !decoded.isAdmin) {
//         return res.status(403).json({ message: 'Forbidden: Admins only' });
//       }

//       return handler(req, res);
//     } catch (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//   };
// };

