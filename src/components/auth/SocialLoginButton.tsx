type SocialLoginButtonProps = {
  provider: "google" | "apple";
  onClick?: () => void;
};

const providerLabels = {
  google: "Google",
  apple: "Apple",
};

function SocialLoginButton({ provider, onClick }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 transition hover:bg-slate-50 active:scale-[0.99]"
    >
      <span className="font-semibold">{provider === "google" ? "G" : "●"}</span>
      Zaloguj się przez {providerLabels[provider]}
    </button>
  );
}

export default SocialLoginButton;
