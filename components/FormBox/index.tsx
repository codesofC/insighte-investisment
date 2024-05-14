import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Combox } from "./Combox";
import { AnalysisData } from "@/constants/index";
import { type } from "os";
import Image from "next/image";

export type FormProps = {
  profile: string;
  goal: string;
  timeHorizon: string;
  market: string;
  company: string;
  country?: string;
};

const initialState = {
  profile: "",
  goal: "",
  timeHorizon: "",
  market: "",
  company: "",
};

type SubmitProps = {
  submit: (properties: any) => void;
};

const FormBox = ({ submit }: SubmitProps) => {
  const [properties, setProperties] = useState<FormProps>(initialState);

  const disabledBtn =
    properties.profile &&
    properties.goal &&
    properties.market &&
    properties.timeHorizon &&
    properties.company
      ? false
      : true;

  return (
    <div className="w-full flex flex-col gap-16 items-center p-4">
      <div className="w-[120px]">
        <Image
          src={"/logo.png"}
          width={250}
          height={250}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-16">
        <div className="w-full grid grid-cols-2 gap-12">
          {AnalysisData.map((item) => (
            <Combox
              key={item.key}
              title={item.label}
              data={item}
              handleFn={setProperties}
            />
          ))}
        </div>

        <Button
          disabled={disabledBtn}
          className={`text-xl py-6 ${disabledBtn ? "bg-gray-400" : null}`}
          onClick={() => submit(properties)}
        >
          {" "}
          Analise{" "}
        </Button>
      </div>
    </div>
  );
};

export default FormBox;
