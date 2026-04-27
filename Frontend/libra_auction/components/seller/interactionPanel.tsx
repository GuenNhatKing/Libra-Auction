"use client";
import { useState } from "react";
import { participants, questions as initialQuestions } from "@/data/interaction";

export default function InteractionPanel() {
  const [activeTab, setActiveTab] = useState<'qa' | 'users'>('qa');
  const [questions, setQuestions] = useState(initialQuestions);
  const [reply, setReply] = useState<{ [key: string]: string }>({});

  const handleReply = (qId: string) => {
    if (!reply[qId]) return;
    setQuestions(prev => prev.map(q => 
      q.id === qId ? { ...q, answer: reply[qId] } : q
    ));
    setReply(prev => ({ ...prev, [qId]: "" }));
  };

  return (
    <div className="bg-white border border-[#AFD3E2] rounded-lg overflow-hidden mt-6">
      {/* Tabs Control */}
      <div className="flex bg-gray-50 border-b border-[#AFD3E2]">
        <button 
          onClick={() => setActiveTab('qa')}
          className={`flex-1 p-4 font-bold transition-all ${activeTab === 'qa' ? 'text-[#146C94] border-b-2 border-[#146C94] bg-white' : 'text-gray-400'}`}
        >
          Hỏi & Đáp ({questions.length})
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          className={`flex-1 p-4 font-bold transition-all ${activeTab === 'users' ? 'text-[#146C94] border-b-2 border-[#146C94] bg-white' : 'text-gray-400'}`}
        >
          Người Tham Gia ({participants.length})
        </button>
      </div>

      <div className="p-4 h-[400px] overflow-y-auto">
        {activeTab === 'qa' ? (
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="space-y-3 p-4 bg-[#F6F1F1] rounded-lg border border-gray-100">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm">{q.user} <span className="text-[10px] font-normal text-gray-400">{q.createdAt}</span></span>
                </div>
                <p className="text-gray-700 text-sm">{q.content}</p>
                
                {q.answer ? (
                  <div className="ml-6 p-3 bg-[#AFD3E2] bg-opacity-30 border-l-4 border-[#146C94] rounded text-sm italic">
                    <span className="font-bold not-italic">Seller:</span> {q.answer}
                  </div>
                ) : (
                  <div className="flex gap-2 ml-6">
                    <input 
                      className="flex-1 border border-[#AFD3E2] rounded px-3 py-1 text-sm outline-none"
                      placeholder="Nhập câu trả lời..."
                      value={reply[q.id] || ""}
                      onChange={(e) => setReply({...reply, [q.id]: e.target.value})}
                    />
                    <button 
                      onClick={() => handleReply(q.id)}
                      className="bg-[#146C94] text-white px-4 py-1 rounded text-sm font-bold"
                    >
                      Gửi
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-2">
            {participants.map((u) => (
              <div key={u.id} className="flex justify-between items-center p-3 hover:bg-[#F6F1F1] rounded border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#AFD3E2] rounded-full flex items-center justify-center text-xs">👤</div>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-[10px] text-gray-400">Tham gia lúc: {u.joinTime}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}