import { signUpAction } from "@/app/actions/auth";

export default function SignUpPage() {
  return (
    <div className="col-span-8 px-8 space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <form action={signUpAction} className="space-y-4">
        <input
          name="name"
          placeholder="Navn"
          required
          className="w-full rounded-md outline-1 border border-primary px-3 py-2"
        />

        <input
          name="username"
          placeholder="Brugernavn"
          required
          className="w-full rounded-md outline-1 border border-primary px-3 py-2"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md utline-1 border border-primary px-3 py-2"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full rounded-md utline-1 border border-primary px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-primary text-white font-medium rounded-md px-4 py-2 hover:bg-secondary"
        >
          Tilføj Holdleder
        </button>
      </form>
    </div>
  );
}
