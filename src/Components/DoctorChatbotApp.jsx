import { useEffect, useRef, useState } from 'react';
import { ArrowUp, Bot, RotateCcw, Stethoscope, UserRound } from 'lucide-react';

// Keeping the reply in the client bundle is the whole latency optimization.
const DOCTOR_RESPONSE = 'cancer';

function DoctorChatbotApp() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    const message = draft.trim();
    if (!message) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: `${Date.now()}-patient`, role: 'patient', text: message },
      { id: `${Date.now()}-doctor`, role: 'doctor', text: DOCTOR_RESPONSE },
    ]);
    setDraft('');
  };

  const clearConversation = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30">
      <div className="grid min-h-[620px] lg:grid-cols-[320px_1fr]">
        <div className="border-b border-slate-800 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Stethoscope className="h-5 w-5" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
            Medical intelligence
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-50">
            Ultra low latency doctor chatbot
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            Describe your symptoms and get an immediate response from Dr. Instant.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-300">Doctor is online</p>
                <p className="text-[11px] text-slate-600">Accepting every condition</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-[11px] leading-relaxed text-slate-700">
            For entertainment purposes only. This is not medical advice, which will become apparent almost immediately.
          </p>
        </div>

        <div className="flex min-h-[560px] flex-col bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_45%)]">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">Dr. Instant</h3>
                <p className="text-xs text-emerald-400">Ready to diagnose</p>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={clearConversation}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear
              </button>
            )}
          </div>

          <div
            className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 sm:p-6"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.length === 0 ? (
              <div className="m-auto max-w-sm py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-slate-500">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-slate-200">What brings you in today?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Headache, funny knee, existential dread—Dr. Instant has seen it all.
                </p>
              </div>
            ) : (
              messages.map((message) => {
                const isPatient = message.role === 'patient';

                return (
                  <div
                    key={message.id}
                    className={`flex items-end gap-3 ${isPatient ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isPatient && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isPatient
                          ? 'rounded-br-md bg-emerald-500 text-slate-950'
                          : 'rounded-bl-md border border-slate-800 bg-slate-900 text-slate-200'
                      }`}
                    >
                      {message.text}
                    </div>
                    {isPatient && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-slate-400">
                        <UserRound className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={conversationEndRef} />
          </div>

          <form onSubmit={sendMessage} className="border-t border-slate-800 p-4 sm:p-5">
            <div className="flex items-end gap-3 rounded-2xl border border-slate-800 bg-slate-950 p-2 transition-colors focus-within:border-emerald-500/50">
              <label htmlFor="doctor-message" className="sr-only">
                Describe your symptoms
              </label>
              <textarea
                ref={inputRef}
                id="doctor-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    sendMessage(event);
                  }
                }}
                rows={1}
                placeholder="Describe your symptoms..."
                className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-700"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                aria-label="Send message"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-700">
              Press Enter to send · Shift + Enter for a new line
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default DoctorChatbotApp;
