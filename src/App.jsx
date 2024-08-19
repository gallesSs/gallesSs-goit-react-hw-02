import { useEffect, useState } from 'react'
import './App.css'
import Description from './components/Descriprion/Description'
import Options from './components/Options/Options'
import Feedback from './components/Feedback/Feedback'
import Notification from './components/Notification/Notification'

function App() {

  const [optionsList, setOptionsList] = useState(() => {

    const localFeedback = localStorage.getItem("options");
  return localFeedback
    ? JSON.parse(localFeedback)
    : {
        good: 0,
        neutral: 0,
        bad: 0,
      };
});


  useEffect (() => {
    localStorage.setItem("options", JSON.stringify(optionsList))
  }, [optionsList])

  const resetFeedback = () => {
    setOptionsList({ good: 0, neutral: 0, bad: 0 })
  }

  const totalFeedback = optionsList.good + optionsList.neutral + optionsList.bad

  const positiveFeedback = Math.round((optionsList.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    setOptionsList({...optionsList, [feedbackType]: optionsList[feedbackType] + 1})
  }

  return (
    <>
    <Description />
    <Options resetFeedback={resetFeedback} updateFeedback={updateFeedback} total={totalFeedback} />
{ totalFeedback ? <Feedback positive={positiveFeedback} total={totalFeedback} good={optionsList.good} neutral={optionsList.neutral} bad={optionsList.bad} /> : <Notification />}    </>
  )
}

export default App
