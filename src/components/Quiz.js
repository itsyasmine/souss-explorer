// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Navigation from './Navigation';
import '../styles/Quiz.css';
import backIcon from '../assets/icons/back-icon.svg';

function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const quizCollection = collection(db, 'quizQuestions');
        const quizSnapshot = await getDocs(quizCollection);
        const quizList = quizSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setQuizQuestions(quizList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions: ", error);
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, []);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    
    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    // Wait a moment to show the result before moving to next question
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return <div className="loading">Chargement du quiz...</div>;
  }

  if (quizQuestions.length === 0) {
    return <div className="error">Aucune question de quiz disponible</div>;
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="quiz-results">
          <h2>Résultats du Quiz</h2>
          <p>Votre score: {score} / {quizQuestions.length}</p>
          <button className="btn restart-btn" onClick={restartQuiz}>
            Recommencer le Quiz
          </button>
        </div>
        <Navigation />
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Quiz</h1>
        <div className="quiz-progress">
          Question {currentQuestion + 1} / {quizQuestions.length}
        </div>
      </div>
      
      <div className="question-container">
        <h2>{currentQ.question}</h2>
        
        {currentQ.imageUrl && (
          <div 
            className="question-image" 
            style={{ backgroundImage: `url(${currentQ.imageUrl})` }}
          ></div>
        )}
        
        <div className="answers-container">
          {currentQ.options.map((option, index) => (
            <button 
              key={index}
              className={`answer-btn ${selectedAnswer === option ? 
                (option === currentQ.correctAnswer ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <Navigation />
    </div>
  );
}

export default Quiz;