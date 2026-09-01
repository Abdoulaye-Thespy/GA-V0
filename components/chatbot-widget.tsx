"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { Bot, Loader2, MessageCircle, RotateCcw, Send, X } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type ChatMessage = { role: "user" | "assistant"; content: string }

const initialMessage: ChatMessage = {
  role: "assistant",
  content: "Bonjour, je suis l'assistant de Global Academy. Comment puis-je vous aider ?",
}

function readResponse(payload: unknown): string | null {
  if (typeof payload === "string") return payload
  if (!payload || typeof payload !== "object") return null
  
  const data = payload as Record<string, unknown>
  
  if (typeof data.message === "string") return data.message
  if (typeof data.response === "string") return data.response
  if (typeof data.content === "string") return data.content
  
  const message = data.message as Record<string, unknown> | undefined
  if (message && typeof message.content === "string") return message.content
  
  const choices = data.choices as Array<Record<string, unknown>> | undefined
  const choiceMessage = choices?.[0]?.message as Record<string, unknown> | undefined
  return choiceMessage && typeof choiceMessage.content === "string" ? choiceMessage.content : null
}

function TypingAnimation() {
  return (
    <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
      <div className="flex gap-1">
        <span 
          className="h-2 w-2 rounded-full bg-gold animate-bounce" 
          style={{ animationDelay: "0ms" }}
        />
        <span 
          className="h-2 w-2 rounded-full bg-gold animate-bounce" 
          style={{ animationDelay: "150ms" }}
        />
        <span 
          className="h-2 w-2 rounded-full bg-gold animate-bounce" 
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="ml-2 text-sm text-muted-foreground animate-pulse">
        En train d'écrire...
      </span>
    </div>
  )
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`
    }
  }, [input])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = input.trim()
    if (!content || loading) return
    
    const nextMessages = [...messages, { role: "user" as const, content }]
    setMessages(nextMessages)
    setInput("")
    setError(null)
    setLoading(true)

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CHAT_API_URL?.replace(/\/$/, "")
      if (!baseUrl) throw new Error("L'API du chatbot n'est pas configurée.")

      const response = await fetch(`${baseUrl}/chat/safe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: nextMessages,
        }),
      })

      if (!response.ok) throw new Error("Le service est momentanément indisponible.")

      const payload = await response.json()
      const reply = readResponse(payload)
      
      if (!reply) throw new Error("La réponse du service est invalide.")
      
      setMessages((current) => [...current, { role: "assistant", content: reply }])

    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  function clearConversation() {
    setMessages([initialMessage])
    setError(null)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <section 
          aria-label="Assistant Global Academy" 
          className="flex h-[min(620px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
        >
          <header className="flex items-center justify-between bg-forest px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gold p-2 text-forest">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-lg font-bold">Assistant Global Academy</p>
                <p className="flex items-center gap-1 text-xs text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> 
                  {loading ? "En train de répondre..." : "En ligne"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                type="button" 
                onClick={clearConversation} 
                aria-label="Effacer la conversation" 
                className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setOpen(false)} 
                aria-label="Fermer le chatbot" 
                className="rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-cream p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div 
                key={`${message.role}-${index}`} 
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user" 
                      ? "rounded-br-sm bg-forest text-white" 
                      : "rounded-bl-sm border border-border bg-card text-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    // ✅ Wrapper avec les classes prose
                    <div className="prose prose-sm max-w-none dark:prose-invert
                      prose-headings:text-foreground prose-headings:font-bold
                      prose-p:text-foreground prose-p:leading-6
                      prose-strong:text-foreground prose-strong:font-bold
                      prose-ul:list-disc prose-ul:pl-4 prose-ul:space-y-1
                      prose-li:text-foreground prose-li:leading-6
                      prose-hr:border-border">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}

            {loading && <TypingAnimation />}

            {error && (
              <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3">
            <label htmlFor="chatbot-message" className="sr-only">Votre message</label>
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                id="chatbot-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Écrivez votre message..."
                rows={1}
                className="max-h-24 min-h-11 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e as any)
                  }
                }}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading} 
                aria-label="Envoyer le message" 
                className="rounded-xl bg-gold p-3 text-forest transition hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </section>
      )}

      <button 
        type="button" 
        onClick={() => setOpen((current) => !current)} 
        aria-expanded={open} 
        aria-label={open ? "Fermer le chatbot" : "Ouvrir le chatbot"} 
        className="group flex items-center gap-3 rounded-full bg-forest px-4 py-3 text-white shadow-lg transition hover:bg-forest-light"
      >
        <span className="hidden text-sm font-bold sm:inline">Une question ?</span>
        <span className="rounded-full bg-gold p-2 text-forest">
          <MessageCircle className="h-5 w-5" />
        </span>
      </button>
    </div>
  )
}