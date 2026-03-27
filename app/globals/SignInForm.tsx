import { signInAction } from "@/app/actions/auth";

export default function SignInForm() {
  return (
    <div className="flex items-center justify-center">
      <div>
        <form action={signInAction} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Brugernavn"
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
