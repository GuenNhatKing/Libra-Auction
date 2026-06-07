import Link from "next/link";

const STATUS_DESCRIPTIONS: Record<number, string> = {
  401: "Please sign in to continue using this feature.",
  403: "Your account does not have permission to perform this action or access this page.",
  404: "The page or data you requested does not exist or has been moved.",
  500: "The system is experiencing an issue. Please try again later.",
  503: "Frontend could not connect to backend. Please check the server.",
};

type ErrorViewProps = {
  status: number;
  title: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorView({ status, title, message, onRetry }: ErrorViewProps) {
  const description = message || STATUS_DESCRIPTIONS[status] || STATUS_DESCRIPTIONS[500];

  return (
    <main className="h-screen bg-[#F6F1F1] px-4 py-16">
      <section className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl border border-[#AFD3E2] bg-white px-6 py-12 text-center shadow-lg shadow-[#AFD3E2]/30 sm:px-10">
        <div className="mb-6 rounded-full bg-[#EAF7FB] px-5 py-2 text-sm font-bold tracking-[0.3em] text-[#146C94]">
          ERROR {status}
        </div>
        <h1 className="text-3xl font-black text-[#146C94] sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#5A7184]">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-xl bg-[#19A7CE] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#19A7CE]/30 transition hover:bg-[#146C94] focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:ring-offset-2"
            >
              Retry
            </button>
          ) : null}
          <Link
            href="/"
            className="rounded-xl border border-[#AFD3E2] bg-white px-6 py-3 text-sm font-bold text-[#146C94] transition hover:bg-[#EAF7FB] focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:ring-offset-2"
          >
            Back to Home
          </Link>
          {(status === 401 || status === 403) ? (
            <Link
              href="/sign-in"
              className="rounded-xl border border-[#AFD3E2] bg-[#F6F1F1] px-6 py-3 text-sm font-bold text-[#146C94] transition hover:bg-[#EAF7FB] focus:outline-none focus:ring-2 focus:ring-[#19A7CE] focus:ring-offset-2"
            >
              Sign In
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}