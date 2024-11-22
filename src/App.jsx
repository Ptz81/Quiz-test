import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from './questions.json';
import Quiz from './components/questionary/Questionary';


function App() {

  return (
    <>
     <Quiz questions={questions} />.
    </>
  )
}

export default App
