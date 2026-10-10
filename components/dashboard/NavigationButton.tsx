"use client";
import { useRouter, usePathname } from "next/navigation";
import { PrimaryButton } from "../common";

interface NavigationButtonProps {
  routeName: string;
  value: string;
  className?: string;
}

export default function NavigationButton({
  routeName,
  value,
  className,
}: NavigationButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const normalizedRoute = routeName.startsWith("/")
      ? `${pathname}${routeName}`
      : `${pathname}/${routeName}`;

    router.push(normalizedRoute);
  };

  return (
    <PrimaryButton
      onClick={handleClick}
      className={`px-6 py-3 rounded-md font-bold text-white ${className}
        `}
    >
      {value}
    </PrimaryButton>
  );
}
