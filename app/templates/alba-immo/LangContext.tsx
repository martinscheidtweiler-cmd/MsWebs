"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, getT, Translations } from "./i18n";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: "nl",
  setLang: () => {},
  t: getT("nl"),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("hi_lang") as Lang | null;
    if (stored && ["nl", "fr", "en"].includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("hi_lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: getT(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
