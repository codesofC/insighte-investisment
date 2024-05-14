"use client";

import { useEffect, useState } from "react";
import { runAnalysis } from "../components/action";
import FormBox, { FormProps } from "@/components/FormBox/index";
import MessagesBox from "@/components/MessagesBox/index";

export default function Home() {
  const [messages, setMessages] = useState<any[]>();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (properties: FormProps) => {
    setIsLoading(true);
    runAnalysis(properties)
      .then((data) => {
        setMessages(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="w-full max-w-6xl h-[60vh] mx-auto grid lg:grid-cols-2 justify-center gap-6 my-20 divide-y-2 lg:divide-y-0 lg:divide-x-2">
      <div className="flex-[.5] flex items-center justify-center rounded-lg">
        <FormBox submit={handleSubmit} />
      </div>
      <div className="flex-[.5] h-full min-h-[60vh] overflow-hidden p-4 rounded-lg">
        {!isLoading ? (
          <MessagesBox messages={messages} />
        ) : (
          <div className="relative flex h-full w-full justify-center items-center">
            <span className="absolute animate-ping flex h-12 w-12 rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative flex rounded-full h-8 w-8 bg-sky-500"></span>
          </div>
        )}
      </div>
    </main>
  );
}
