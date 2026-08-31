import Logo from "../components/auth/Logo";
import SocialLoginButton from "../components/auth/SocialLoginButton";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-10 text-center">
          <Logo vertical />
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Zarządzaj swoim domem
            <br />w jednym miejscu
          </p>
        </div>

        <div className="space-y-3">
          <SocialLoginButton provider="google" />
          <SocialLoginButton provider="apple" />
        </div>

        <div className="my-7 flex items-center gap-4 text-xs text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          <span>lub</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="Adres e-mail"
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Dalej
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Nie masz konta?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Zarejestruj się
          </button>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
