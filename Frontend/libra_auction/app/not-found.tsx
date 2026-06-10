import ErrorView from "@/components/error/error_view";

export default function NotFound() {
  return (
    <ErrorView
      status={404}
      title="Page Not Found"
      message="The page you are looking for does not exist or has been removed."
    />
  );
}
