'use client'

import { FormProps } from "@/components/FormBox/index";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ""
);

export const runAnalysis = async (properties: FormProps) => {
  const instructions = "Você é uma especialista em investimentos no Brasil. Seu trabalho é avaliar idea de investimento do cliente analisando o mercado, historicos financeiros, o risco de liquidez e a diversificação, usando os dados seguintes: perfil do investidor, objetivo, o mercado de investimento, a horizonte de tempo que vai demorar, o tipo de empresa vai acontecer esse investimento e o país onde quer fazer isso. Finalizando com uma conclusão sobre o que você pensa dessa ideia de investimento e indica-lá a buscar ajuda de profissional qualificado."

  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction: instructions,
  });

  const prompt = `Sou um investidor ${properties.profile}. Tenho um objetivo de ${properties.goal} prazo para investir no mercado ${properties.market}, numa empresa de ${properties.company} ${properties.country ? `no ${properties.country}` : ""}, durante ${properties.timeHorizon}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = formatText(response.text())
  console.log(text);
  return text
};


function formatText(text: string) {
    let cutText: any[] = [];
    const textLines = text.split("\n");

    textLines.forEach((line) => {
        if(line.includes("##" || "###")){
            cutText.push(<h2 className="text-lg font-bold">{line.replaceAll("##", "")}</h2>)
        }else if(line.includes("**")){
            cutText.push(<>{line.replaceAll("*", "")} <br /><br /></>)
        }else if(line.includes("*")){
            cutText.push(<>{line.replaceAll("*", "")} <br /></>)
        }else{
            cutText.push(line)
        }
    });


    return cutText
}