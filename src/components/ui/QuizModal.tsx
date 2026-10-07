import React, { useState } from 'react';
import { QuizQuestion, Language } from '../../types/game';
import { translations } from '../../data/translations';
import { audioService } from '../../services/audioService';

interface QuizModalProps {
  questions: QuizQuestion[];
  language: Language;
  onComplete: () => void;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  questions,
  language,
  onComplete,
  onClose,
}) => {
  const t = translations[language];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelect = (idx: number) => {
    if (hasSubmitted) return;
    audioService.playButtonClick();
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || hasSubmitted) return;
    setHasSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      audioService.playQuizCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      audioService.playQuizWrong();
    }
  };

  const handleNext = () => {
    audioService.playButtonClick();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      // Finished all questions!
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <div>
              <h3 className="font-heading font-bold text-amber-400 text-lg sm:text-xl">
                {t.quizTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Question {currentIdx + 1} of {questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              audioService.playButtonClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Question Text */}
        <div className="my-5">
          <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
            {language === 'hi' ? currentQ.questionHi : currentQ.questionEn}
          </p>
        </div>

        {/* Option Choices */}
        <div className="space-y-2.5 mb-6">
          {(language === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => {
            let optionStyles = 'border-slate-700 bg-slate-800/60 text-slate-200 hover:border-amber-500/60';

            if (selectedOption === idx && !hasSubmitted) {
              optionStyles = 'border-amber-400 bg-amber-500/20 text-amber-200 ring-2 ring-amber-400/50';
            }

            if (hasSubmitted) {
              if (idx === currentQ.correctIndex) {
                optionStyles = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500';
              } else if (selectedOption === idx) {
                optionStyles = 'border-rose-500 bg-rose-500/20 text-rose-300 ring-2 ring-rose-500';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={hasSubmitted}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-sm sm:text-base font-medium ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-700/80 text-xs font-bold flex items-center justify-center">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {hasSubmitted && idx === currentQ.correctIndex && (
                  <span className="text-emerald-400 font-bold text-lg">✓</span>
                )}
                {hasSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                  <span className="text-rose-400 font-bold text-lg">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card upon submission */}
        {hasSubmitted && (
          <div className="mb-5 p-3.5 bg-slate-800/90 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-300">
            <span className="font-bold text-amber-400 block mb-1">
              {selectedOption === currentQ.correctIndex ? '✓ ' + t.correct : '✕ ' + t.incorrect}
            </span>
            {language === 'hi' ? currentQ.explanationHi : currentQ.explanationEn}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
                selectedOption !== null
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {t.submitAnswer}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
            >
              {currentIdx + 1 < questions.length ? 'Next Question →' : 'Finish Quiz ✓'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
