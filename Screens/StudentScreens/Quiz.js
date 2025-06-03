import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import Header from '../../Components/Home/Header';

export default function Quiz() {
  const quizData = [
    {
      id: '1',
      question: 'What is the capital of India?',
      options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
      answer: 'New Delhi',
    },
    {
      id: '2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
      answer: 'Mars',
    },
    {
      id: '3',
      question: 'Who is the father of the nation of India?',
      options: [
        'Subhash Chandra Bose',
        'Mahatma Gandhi',
        'Jawaharlal Nehru',
        'B. R. Ambedkar',
      ],
      answer: 'Mahatma Gandhi',
    },
    {
      id: '4',
      question: 'How many days are there in a leap year?',
      options: ['365', '366', '364', '360'],
      answer: '366',
    },
    {
      id: '5',
      question: 'Which gas do plants absorb from the air?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      answer: 'Carbon Dioxide',
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = option => {
    const correct = quizData[currentQuestion].answer === option;
    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <>
      <Header title="Quizzes"/>
      <ImageBackground
        source={require('../../Assets/attendance/AttendanceBg.png')}
        style={{
          backgroundColor: '#edf5fa',
          paddingBottom: 10,
          paddingEnd: 2,
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{padding: 20}}>
          {showResult ? (
            <View>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
                {score === quizData.length
                  ? "You're a Genius! 🔥 All answers are correct!"
                  : `Quiz Completed! Your Score: ${score}/${quizData.length}`}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setShowResult(false);
                }}
                style={{
                  marginTop: 20,
                  backgroundColor: '#4CAF50',
                  padding: 10,
                  borderRadius: 8,
                }}>
                <Text style={{color: 'white'}}>Play Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                  textAlign: 'center',
                  fontWeight: '500',
                  color: '#000',
                }}>
                {quizData[currentQuestion].question}
              </Text>
              {quizData[currentQuestion].options.map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleAnswer(option)}
                  style={{
                    backgroundColor: '#ff9e80',
                    padding: 12,
                    marginVertical: 5,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{color: 'white', fontSize: 14, fontWeight: '500'}}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ImageBackground>
    </>
  );
}

//   paddingVertical: 10,
//         alignItems: 'center',
//         borderRadius: 10,
//         backgroundColor: '#ff9e80',
//         height: 45,
//         width: windowWidth * 0.7,
//         alignSelf: 'center',
//         marginTop: 5,
