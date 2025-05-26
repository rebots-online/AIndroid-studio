
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TraditionalFormValues } from "./traditional-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const initialBotMessage = "Hello! I'm Droid Architect's assistant. Let's configure your Android AI app. First, what would you like to name your application?";

const questions = [
  { key: "appName", question: "Great! What would you like to name your application?" },
  { key: "appFunctionality", question: "Got it. Now, could you describe the core functionality of your app? What problem does it solve?" },
  { key: "aiFeatures", question: "Interesting! What specific AI features are you planning to integrate? (e.g., image recognition, NLP)" },
  { key: "platformSpecifics", question: "Good to know. Are there any platform specifics to consider? (e.g., target Android versions, Termux compatibility) If not, just say 'skip'." },
  { key: "confirmation", question: "Thanks! I have all the information. Ready to generate the framework and documentation?" }
];

interface ConversationalUiProps {
  onSubmit: (values: TraditionalFormValues) => Promise<void>;
  isLoading: boolean;
}

export function ConversationalUi({ onSubmit, isLoading }: ConversationalUiProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: initialBotMessage, sender: "bot" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Partial<TraditionalFormValues>>({});
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: String(Date.now()),
      text: inputValue,
      sender: "user",
    };
    setMessages((prev) => [...prev, newUserMessage]);

    const currentField = questions[currentQuestionIndex].key as keyof TraditionalFormValues;
    const newFormData = { ...formData, [currentField]: inputValue };
    setFormData(newFormData);
    setInputValue("");

    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextQuestionIndex);
      const botResponse: Message = {
        id: String(Date.now() + 1),
        text: questions[nextQuestionIndex].question,
        sender: "bot",
      };
      setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);
    } else {
      // All questions answered, submit the form
      await onSubmit(newFormData as TraditionalFormValues);
      if (!isLoading) { // Only reset if not loading (i.e., submission successful)
         const finalBotMessage: Message = {
            id: String(Date.now() + 1),
            text: "Generation process initiated! Check other pages for results.",
            sender: "bot",
          };
        setTimeout(() => setMessages((prev) => [...prev, finalBotMessage]), 500);
      }
    }
  };

  const isConfirmationStep = questions[currentQuestionIndex].key === "confirmation";

  return (
    <Card className="shadow-lg w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Conversational Configuration</CardTitle>
        <CardDescription>Let's chat about your app requirements step-by-step.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                 {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User size={18}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && currentQuestionIndex >= questions.length -1 && (
                 <div className="flex items-end gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-[70%] rounded-lg px-4 py-2 bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder={isConfirmationStep ? "Type 'yes' to generate..." : "Type your answer..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
            disabled={isLoading || currentQuestionIndex >= questions.length -1 && !isConfirmationStep }
          />
          <Button type="button" onClick={handleSendMessage} disabled={isLoading || currentQuestionIndex >= questions.length -1 && !isConfirmationStep }>
            {isConfirmationStep ? "Generate" : <Send className="h-4 w-4"/>}
            <span className="sr-only">{isConfirmationStep ? "Generate" : "Send"}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
