export const dynamic = "force-dynamic";

interface Props {
  params: { username: string };
}

export default function UserProfile({ params }: Props) {
  const username = params.username;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <span className="text-3xl text-indigo-600 font-bold">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-indigo-700 mb-2 text-center">
          {username}'s Profile
        </h1>
        <p className="text-gray-600 text-center">
          Welcome to the profile of{" "}
          <span className="font-semibold text-indigo-700">{username}</span>.
        </p>
      </section>
    </main>
  );
}
