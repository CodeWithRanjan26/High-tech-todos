import React, { useState } from 'react';
import './AIAssistant.css'; // For styling

function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleAsk = () => {
    const lowerCaseQuestion = question.trim().toLowerCase();

    if (!lowerCaseQuestion) {
      setResponse("Please enter a question first.");
      return;
    }

    // Handling basic greetings
    if (["hi", "hello", "hey"].includes(lowerCaseQuestion)) {
      setResponse("👋 Hello! I'm Tobo AI. How can I assist you today?");
    } 
    // Saying thank you
    else if (lowerCaseQuestion.includes("thank")) {
      setResponse("🙏 You're welcome! Always happy to assist you.");
    } 
    // Asking about AI's well-being
    else if (lowerCaseQuestion.includes("how are you")) {
      setResponse("🤖 I'm always energized and ready to help you!");
    }
    // Asking who AI is
    else if (lowerCaseQuestion.includes("who are you")) {
      setResponse("🧠 I'm Tobo AI, your smart assistant for task management and productivity!");
    }
    // Task planning
    else if (lowerCaseQuestion.includes("plan") || lowerCaseQuestion.includes("task")) {
      setResponse("📝 Break down big tasks into smaller steps, and prioritize the most urgent ones.");
    }
    // Motivation
    else if (lowerCaseQuestion.includes("motivate") || lowerCaseQuestion.includes("motivation")) {
      setResponse("🚀 Keep going! Every step you take today builds your better tomorrow!");
    }
    // Daily routine advice
    else if (lowerCaseQuestion.includes("routine") || lowerCaseQuestion.includes("daily")) {
      setResponse("📅 Plan 3 top priorities each day and reward yourself after completing them!");
    }
    // Deadline help
    else if (lowerCaseQuestion.includes("deadline") || lowerCaseQuestion.includes("urgent")) {
      setResponse("⏳ Tackle urgent tasks first! Set mini-deadlines to stay stress-free.");
    }
    // Time management
    else if (lowerCaseQuestion.includes("time management") || lowerCaseQuestion.includes("manage time")) {
      setResponse("⏰ Try the Pomodoro method: 25 mins focused work, 5 mins break!");
    }
    // Default fallback
    else {
      setResponse("🤔 I'm still learning! Try asking me about tasks, motivation, routines, or time management.");
    }

    setQuestion('');
  };

  return (
    <div className="card ai-assistant">
      <h3>Tobo AI 🤖</h3>
      <p>Type your question! I'm here to help you manage your work smarter.</p>

      <div className="input-section">
        <input
          type="text"
          value={question}
          placeholder="Type your question..."
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk}>Ask</button>
      </div>

      {response && (
        <div className="response-section">
          <strong>AI says:</strong> <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
