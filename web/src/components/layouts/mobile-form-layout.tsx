import { PropsWithChildren } from "react";
import NLWUniteLogo from "../nlw-unite-logo";

interface MobileFormLayoutProps extends PropsWithChildren {}

export default function MobileFormLayout({ children }: MobileFormLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-firefly-950 flex items-start justify-center">
      <div className="max-w-[390px] w-full min-h-screen py-8 flex flex-col items-center justify-center">
        <div className="w-fit h-fit mx-auto mb-8">
          <NLWUniteLogo />
        </div>

        {children}
      </div>
    </div>
  );
}
