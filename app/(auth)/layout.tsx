type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl items-center justify-center px-2">
      {children}
    </div>
  );
};

export default AuthLayout;
