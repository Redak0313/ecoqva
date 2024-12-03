import SignUpForm from '../ui/signup-form';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <SignUpForm />
      </div>
    </div>
  );
}
