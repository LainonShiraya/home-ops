import Logo from "../components/auth/Logo";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-10 text-center">
          <Logo />

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Zarządzaj swoim domem
            <br />w jednym miejscu
          </p>
        </div>

        <GoogleLoginButton />

        <p className="mt-8 text-center text-xs leading-5 text-slate-400">
          Logując się, akceptujesz warunki korzystania z HomeOps.
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
