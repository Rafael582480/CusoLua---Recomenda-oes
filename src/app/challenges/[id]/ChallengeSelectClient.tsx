"use client";
import { useState } from "react";
import { Description } from "@/components/description/Description";
import { Textarea } from "@/components/textarea/Textarea";

interface Challenge {
  id: string;
  description: string;
  codebase: string;
  nome: string;
}

interface VerificationResult {
  message: string;
  sucess?: boolean;
  errors?: string[];
  result?: string;
  compiledCode?: string;
  output?: string;
  metadata?: { originalSize: number; compiledSize: number };
}

interface Props {
  id: string;
  initialChallenge: Challenge;
}

export default function ChallengeSelectClient({ id, initialChallenge }: Props) {
  const [challenge] = useState<Challenge>(initialChallenge);
  const [code, setCode] = useState(challenge.codebase || "");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Enter code to run");
      return;
    }

    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/getcode/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "HTTP " + response.status);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  return (
    <section className="w-full md:mt-5">
      <div className="flex flex-col md:flex-row justify-between gap-2 p-3 h-full">
        <Description
          nome={challenge.nome}
          description={challenge.description}
        />
        <Textarea
          codebase={code}
          result={result?.output || result?.result || error || ""}
          handleRun={handleSubmit}
          setCodebase={setCode}
        />
      </div>
    </section>
  );
}
