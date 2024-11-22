
import { useState } from 'react';
import styles from './Questionary.module.css';
import PropTypes from "prop-types";

const Quiz = ({ questions }) => {
    const [index, setIndex] = useState(0);
    const [answerId, setAnswerId] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [fixResult, setFixResult] = useState(false);
    const [iconBg, setIconBg] = useState(Array(questions.length).fill(styles.default));
    const { question, answers } = questions[index];
    
    const handleAnswerClick = (answer, id) => {
        if (!fixResult) {
            setAnswerId(id);
            setIsAnswered(true); 
            setFixResult(true);
            const newIconBg = [...iconBg];
            newIconBg[index] = answer.isCorrect ? styles.correct : styles.incorrect;
            setIconBg(newIconBg);
        }
    };
    
    const nextQuestion = () => {
        if (isAnswered) { 
            
        setAnswerId(null);
        setIndex(index + 1);
        setIsAnswered(false);
            setFixResult(false);
        } 
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.quizTitle}>Question {index + 1} of {questions.length}</h1>
                <hr />
                <h2 className={styles.quizName}>{question}</h2>
                <ul className={styles.quizList}>
                    {answers.map((answer, id) => (
                        <li key={id}
                             className={`${styles.quizListItem} ${isAnswered && answerId === id ? (answer.isCorrect ? styles.correct : styles.incorrect) : ''}`}
                            onClick={() => handleAnswerClick(answer, id)}
                             >
                            {answer.text}
                        </li>
                    ))}
                </ul>
                <button className={styles.btn}
                    onClick={nextQuestion}
                    disabled={index + 1 === questions.length}>
                    Next
                </button>
                <div className={styles.checkContainer}>
                    {iconBg.map((_, index) => (
                        <div key={index} className={`${styles.default} ${iconBg[index]}`}>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
};
Quiz.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            answers: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string.isRequired,
                    isCorrect: PropTypes.bool.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
};

export default Quiz;