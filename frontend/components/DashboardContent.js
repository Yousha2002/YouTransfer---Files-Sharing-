"use client";
import {
  Plus,
  FolderPlus,
  Calendar,
  MoreHorizontal,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Upload, History, FileUp, Clock, Shield } from "lucide-react";
import { useState } from "react";
import TransferForm from "./TransferForm";
import TransferList from "./TransferList";

export default function DashboardContent({ user }) {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <>
      <div className="min-h-screen   bg-gradient-to-br from-[#1B3C53] via-[#234C6A] to-[#456882]">
        <div className="flex  items-center justify-center ">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-all ${
              activeTab === "upload"
                ? "bg-[#D2C1B6] text-[#1B3C53]"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            <Upload className="w-5 h-5" />
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab("transfers")}
            className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-all ${
              activeTab === "transfers"
                ? "bg-[#D2C1B6] text-[#1B3C53]"
                : "text-white/80 hover:text-white hover:bg-white/5"
            }`}
          >
            <History className="w-5 h-5" />
            My Transfers
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === "upload" && (
            <div>
              <TransferForm user={user} />
            </div>
          )}

          {activeTab === "transfers" && (
            <div>
              <TransferList />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
