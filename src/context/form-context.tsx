import { useRouter } from "next/router";
import React, { createContext, useCallback, useState } from "react";

type TFormLegends = {
  isEdit: boolean;
  formTitle: string;
  ctaLabel: string;
};

export type TFormContext = {
  formLegends: TFormLegends;
  updateFormLegends: (legends: TFormLegends) => void;
};

type TFormContextProps = {
  children: React.ReactNode;
};

export const FormContext = createContext({} as TFormContext);

const FormContextProvider: React.FunctionComponent<TFormContextProps> = ({
  children,
}): React.JSX.Element => {
  const router = useRouter();
  const [formLegends, setFormLegends] = useState<TFormLegends>({
    isEdit: router.asPath.includes("update"),
    formTitle: "Form",
    ctaLabel: "Submit",
  } as TFormLegends);

  const formLegendsUpdateHandler = useCallback(
    (_legends: TFormLegends) => {
      setFormLegends({ ..._legends });
    },
    [formLegends]
  );

  return (
    <FormContext.Provider
      value={{
        updateFormLegends: formLegendsUpdateHandler,
        formLegends: formLegends,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContextProvider;
