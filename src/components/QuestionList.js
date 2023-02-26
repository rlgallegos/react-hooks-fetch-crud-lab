import React, {useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, setQuestions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, [setQuestions])

  function handleDelete(itemToDelete) {
    const deleteArray = questions.filter(question => itemToDelete.id !== question.id)
    setQuestions(deleteArray)
  }

  function handleUpdate(questionToUpdate) {
    const updateArray = questions.map(question => {
      if (question.id === questionToUpdate.id) {
        return questionToUpdate
      } else {
        return question
      }
    })
    setQuestions(updateArray)
  }

  const originalList = questions.map(question => {
    return <QuestionItem onUpdate={handleUpdate} onDelete={handleDelete} key={question.id} question={question} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{originalList}</ul>
    </section>
  );
}

export default QuestionList;
