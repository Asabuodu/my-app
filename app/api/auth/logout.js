import { signOut } from 'next-auth/react';

export default async function handler(req, res) {
  await signOut({ redirect: false });
  res.status(200).json({ success: true });
}