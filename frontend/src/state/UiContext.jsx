import React, { createContext, useContext, useEffect, useState } from "react";

const UiContext = createContext(null);
const TUTORIAL_KEY = "ai_judiciary_seen_tutorial";

export const UiProvider = ({ children }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(TUTORIAL_KEY);
    if (!seen) {
      setShowTutorial(true);
    }
  }, []);

  const dismissTutorial = () => {
    localStorage.setItem(TUTORIAL_KEY, "1");
    setShowTutorial(false);
  };

  const reopenTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <UiContext.Provider
      value={{
        showTutorial,
        dismissTutorial,
        reopenTutorial,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => useContext(UiContext);


