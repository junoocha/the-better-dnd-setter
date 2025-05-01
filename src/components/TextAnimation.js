import { useState, useEffect } from "react";

import { useState, useEffect } from 'react';

const TextAnimation = ({ sentences, speed = 100, delayBetweenSentences = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    // If there are no more sentences, stop.
    if (currentSentenceIndex >= sentences.length) return;

    const currentSentence = sentences[currentSentenceIndex];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + currentSentence[currentIndex]);
      currentIndex += 1;

      if (currentIndex === currentSentence.length) {
        clearInterval(interval);
        // Wait for a moment before showing the next sentence
        setTimeout(() => {
          setDisplayedText('');
          setCurrentSentenceIndex((prev) => prev + 1);
        }, delayBetweenSentences);
      }
    }, speed);

    // Cleanup on effect cleanup
    return () => clearInterval(interval);
  }, [currentSentenceIndex, sentences, speed, delayBetweenSentences]);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default TextAnimation;
