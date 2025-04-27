"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { NaturalLanguageDatePicker } from "@/components/ui/nl-date-picker";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { datePickerCode } from "@/lib/code-examples";
import { ClipboardIcon, CheckIcon, GithubIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "how-to">(
    "preview"
  );
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(datePickerCode);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8 relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <a
          href="https://github.com/gulipad"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "rounded-lg border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            "h-9 w-9 p-2 flex items-center justify-center"
          )}
        >
          <GithubIcon className="h-5 w-5" />
          <span className="sr-only">GitHub Profile</span>
        </a>
        <ThemeToggle />
      </div>
      <main className="max-w-4xl w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            A good date picker
          </h1>
          <p className="text-lg text-muted-foreground">
            Because picking dates should not take more than two clicks. Crafted
            with{" "}
            <a
              href="https://ui.shadcn.com/docs/components/date-picker"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              shadcn/ui
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/wanasit/chrono"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              chrono-node
            </a>
            .
          </p>
        </div>

        <div className="space-y-4">
          <nav className="flex border-b">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 pb-3 pt-2 -mb-px text-sm font-medium ${
                activeTab === "preview"
                  ? "border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-4 pb-3 pt-2 -mb-px text-sm font-medium ${
                activeTab === "code"
                  ? "border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setActiveTab("how-to")}
              className={`px-4 pb-3 pt-2 -mb-px text-sm font-medium ${
                activeTab === "how-to"
                  ? "border-b-2 border-primary"
                  : "text-muted-foreground"
              }`}
            >
              How to use
            </button>
          </nav>

          <div className="rounded-lg border">
            {activeTab === "preview" && (
              <div className="p-6">
                <div className="flex min-h-[400px] items-center justify-center">
                  <NaturalLanguageDatePicker />
                </div>
              </div>
            )}
            {activeTab === "code" && (
              <div className="p-0 max-h-[400px] overflow-auto rounded-lg relative">
                <div className="sticky top-3 z-10 flex justify-end px-3 pointer-events-none">
                  <button
                    onClick={copyToClipboard}
                    className={cn(
                      "p-2 rounded-lg pointer-events-auto",
                      "bg-background/80 hover:bg-background border border-border shadow-sm",
                      "transition-colors duration-200"
                    )}
                    aria-label="Copy code"
                  >
                    {hasCopied ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ClipboardIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="-mt-[calc(theme(space.9)+theme(borderWidth.DEFAULT)*2)]">
                  <SyntaxHighlighter
                    language="typescript"
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      paddingTop:
                        "calc(theme(space.9)+theme(borderWidth.DEFAULT)*2)",
                      fontSize: "14px",
                    }}
                  >
                    {datePickerCode}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}
            {activeTab === "how-to" && (
              <div className="p-6">
                <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8">
                  <div className="max-w-xl text-center space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Ready to add this to your project?
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Check out the full documentation and source code on
                      GitHub. It&apos;s free, MIT-licensed, and ready to make
                      your users&apos; lives easier.
                    </p>
                  </div>
                  <a
                    href="https://github.com/gulipad/a-good-date-picker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors",
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                  >
                    <GithubIcon className="h-5 w-5" />
                    View on GitHub
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 w-full p-4 text-center text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <a
          href="https://gulipad.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline font-medium"
        >
          Gulipad
        </a>
      </footer>
    </div>
  );
}
