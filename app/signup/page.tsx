
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function SignupPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     const res = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     if (res.ok) {
//       setSuccess("Account created successfully! Redirecting to sign in...");
//       setTimeout(() => {
//         router.push("/signin"); // Redirect after success
//       }, 2000); // 2 seconds delay
//     } else {
//       const data = await res.json();
//       setError(data.error || "Signup failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-8">
//       <h1 className="text-2xl font-bold mb-6">Create an account</h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       {success && <p className="text-green-600 mb-4">{success}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Username"
//           required
//           className="w-full px-4 py-2 border rounded"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           className="w-full px-4 py-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password (min 6 chars)"
//           required
//           className="w-full px-4 py-2 border rounded"
//           minLength={6}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (res.ok) {
      setSuccess("Account created successfully!");
      setTimeout(() => router.push("/signin"), 1500); // redirect after 1.5s
    } else {
      const data = await res.json();
      setError(data.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create an account</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          required
          minLength={6}
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
