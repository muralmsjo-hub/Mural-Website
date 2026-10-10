import { Locale } from "@/types";
import RegisterForm from "@/components/auth/RegisterForm";
import { generateStaticMetadata } from "@/lib/constants/metadata";
interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const locale = (await params).locale;
  return generateStaticMetadata("register", locale);
};

export default function page() {
  return (
    <div className="flex-1 flex flex-col w-full min-h-screen">
      <RegisterForm />
    </div>
  );
}
