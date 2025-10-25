import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import SideMenu from '../components/SideMenu';

const quizzes = [
  {
    id: 1,
    title: 'How to use cycling lanes',
    points: 10,
    slides: [
      {
        question: 'What side of the road should you cycle on?',
        options: ['Right side', 'Left side', 'Middle', 'Any side'],
        correct: 0,
      },
      {
        question: 'What should you do before turning?',
        options: ['Speed up', 'Signal with your hand', 'Close your eyes', 'Nothing'],
        correct: 1,
      },
      {
        question: 'When should you use bike lanes?',
        options: ['Never', 'Only at night', 'Whenever available', 'Only when raining'],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Air pollution',
    points: 10,
    slides: [
      {
        question: 'Which mode of transport produces the least air pollution?',
        options: ['Car', 'Bus', 'Walking/Cycling', 'Motorcycle'],
        correct: 2,
      },
      {
        question: 'What is a main cause of urban air pollution?',
        options: ['Trees', 'Vehicle emissions', 'Rain', 'Wind'],
        correct: 1,
      },
      {
        question: 'How can you help reduce air pollution?',
        options: ['Drive more', 'Walk or cycle instead', 'Use more plastic', 'Leave lights on'],
        correct: 1,
      },
    ],
  },
];

export default function LearningPage({
  navigateToMap,
  toggleMenu,
  menuOpen,
  slideAnim,
  navigateToYourPet,
  navigateToMyRoutes,
  navigateToLearning,
  totalPoints,
  addPoints,
}) {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState({});

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentSlide(0);
    setSelectedAnswer(null);
    setShowResults(false);
  };

  const handleAnswerSelect = (index) => {
    if (!showResults) {
      setSelectedAnswer(index);
      setShowResults(true);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    if (currentSlide < selectedQuiz.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setSelectedAnswer(null);
      setShowResults(false);
    } else {
      // Quiz completed
      if (!quizCompleted[selectedQuiz.id]) {
        addPoints(selectedQuiz.points);
        setQuizCompleted({ ...quizCompleted, [selectedQuiz.id]: true });
      }
      alert(`Quiz completed! ${quizCompleted[selectedQuiz.id] ? 'Already completed before' : `+${selectedQuiz.points} points earned!`}`);
      setSelectedQuiz(null);
      setCurrentSlide(0);
      setSelectedAnswer(null);
      setShowResults(false);
    }
  };

  const closeQuiz = () => {
    setSelectedQuiz(null);
    setCurrentSlide(0);
    setSelectedAnswer(null);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={commonStyles.container}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={navigateToMap} style={commonStyles.backButton}>
          <Text style={commonStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={commonStyles.appTitle}>Learning</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{totalPoints} pts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={commonStyles.burgerButton}>
            <View style={commonStyles.burgerLine} />
            <View style={commonStyles.burgerLine} />
            <View style={commonStyles.burgerLine} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.pageContent}>
        <View style={styles.quizzesContainer}>
          <Text style={styles.sectionTitle}>Educational Quizzes</Text>
          {quizzes.map((quiz) => (
            <TouchableOpacity
              key={quiz.id}
              style={styles.quizCard}
              onPress={() => startQuiz(quiz)}
            >
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizDetails}>
                  {quiz.slides.length} questions • {quiz.points} points
                </Text>
              </View>
              {quizCompleted[quiz.id] && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Quiz Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedQuiz !== null}
        onRequestClose={closeQuiz}
      >
        {selectedQuiz && (
          <View style={styles.quizModal}>
            <View style={styles.quizHeader}>
              <Text style={styles.quizModalTitle}>{selectedQuiz.title}</Text>
              <TouchableOpacity onPress={closeQuiz}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentSlide + 1) / selectedQuiz.slides.length) * 100}%`,
                  },
                ]}
              />
            </View>

            <Text style={styles.slideCounter}>
              Question {currentSlide + 1} of {selectedQuiz.slides.length}
            </Text>

            <View style={styles.slideContent}>
              <Text style={styles.question}>
                {selectedQuiz.slides[currentSlide].question}
              </Text>

              {selectedQuiz.slides[currentSlide].options.map((option, index) => {
                const isCorrect = index === selectedQuiz.slides[currentSlide].correct;
                const isSelected = selectedAnswer === index;
                const showCorrect = showResults && isCorrect;
                const showIncorrect = showResults && isSelected && !isCorrect;

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      showCorrect && styles.optionButtonCorrect,
                      showIncorrect && styles.optionButtonIncorrect,
                      !showResults && isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={showResults}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        showCorrect && styles.optionTextCorrect,
                        showIncorrect && styles.optionTextIncorrect,
                        !showResults && isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentSlide < selectedQuiz.slides.length - 1 ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>

      <SideMenu
        slideAnim={slideAnim}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        navigateToYourPet={navigateToYourPet}
        navigateToMyRoutes={navigateToMyRoutes}
        navigateToLearning={navigateToLearning}
      />

      <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageContent: {
    flex: 1,
    marginTop: 60,
  },
  quizzesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  quizCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  quizDetails: {
    fontSize: 14,
    color: '#666',
  },
  completedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizModal: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quizModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    fontSize: 28,
    color: '#333',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  slideCounter: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  slideContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    lineHeight: 30,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  optionButtonCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionButtonIncorrect: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  optionTextSelected: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  optionTextCorrect: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  optionTextIncorrect: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pointsBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 5,
  },
  pointsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
