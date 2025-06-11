import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  if (session) {
    res.status(200).json({ 
      user: {
        id: session.user.id,
        username: session.user.name,
        email: session.user.email,
        avatarUrl: session.user.image
      }
    });
  } else {
    res.status(200).json({ user: null });
  }
}