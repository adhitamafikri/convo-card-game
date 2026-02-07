"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/button";

export default function SessionNotFoundPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.sessionId as string;

  const handleBackToMenu = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-error/10 via-base-100 to-base-200">
      <div className="max-w-md mx-auto p-8 bg-base-200 rounded-2xl shadow-warm-lg text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-error mb-4">
          Sesi Tidak Ditemukan
        </h1>
        <p className="text-base-content/70 mb-2">
          Sesi permainan dengan ID{" "}
          <code className="px-2 py-1 bg-base-300 rounded">{sessionId}</code>{" "}
          tidak ditemukan atau sudah berakhir.
        </p>
        <p className="text-base-content/70 mb-6">
          Silakan kembali ke menu utama untuk memulai permainan baru.
        </p>
        <Button variant="primary" size="lg" onClick={handleBackToMenu}>
          Kembali ke Menu Utama
        </Button>
      </div>
    </div>
  );
}
