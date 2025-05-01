import { useState, useEffect } from 'react';

const TextAnimation = ({ sentences, speed = 200, delayBetweenSentences = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  useEffect(() => {
    if (currentSentenceIndex >= sentences.length) return;

    const currentSentence = sentences[currentSentenceIndex];
    let currentIndex = 0;

    // Reset displayed text immediately when new sentence starts
    setDisplayedText('');

    const typeCharacter = () => {
      if (currentIndex < currentSentence.length) {
        const char = currentSentence[currentIndex];
        setDisplayedText((prev) => prev + char);
        currentIndex += 1;
        setTimeout(typeCharacter, speed);
      } else {
        // Wait before moving to the next sentence
        setTimeout(() => {
          setCurrentSentenceIndex((prev) => prev + 1);
        }, delayBetweenSentences);
      }
    };

    typeCharacter();

    // No cleanup needed
  }, [currentSentenceIndex]);

  return (
    <div>
      <p>{displayedText}</p>
    </div>
  );
};

export default TextAnimation;
