import { Fragment, useMemo, useState } from "react";
import MobileFormLayout from "../../components/layouts/mobile-form-layout";
import RegisterForm from "./steps/register-form";
import RegisterList from "./steps/register-list";

export interface RegisterProps {
  name: string;
  email: string;
  step: ERegisterSteps;
}

export enum ERegisterSteps {
  FORM = "FORM",
  LIST = "LIST",
}

export default function Register() {
  const [{ name, email, step }, setRegister] = useState<RegisterProps>({
    name: "",
    email: "",
    step: ERegisterSteps.FORM,
  });

  const returnBody = useMemo(() => {
    switch (step) {
      case ERegisterSteps.FORM:
        return <RegisterForm setRegister={setRegister} />;
      case ERegisterSteps.LIST:
        return <RegisterList name={name} email={email} />;
      default:
        return <Fragment />;
    }
  }, [step]);

  return <MobileFormLayout>{returnBody}</MobileFormLayout>;
}
