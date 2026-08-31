function GoogleLoginButton() {
  const handleLogin = () => {
    console.log("Google login - coming soon");
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="
        flex h-12 w-full items-center justify-center gap-3
        rounded-xl
        border border-slate-200
        bg-white
        text-sm font-medium text-slate-800
        transition
        hover:bg-slate-50
        active:scale-[0.99]
      "
    >
      G Zaloguj się przez Google
    </button>
  );
}

export default GoogleLoginButton;
