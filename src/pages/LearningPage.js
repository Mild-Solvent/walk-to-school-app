import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../styles/commonStyles';
import { colors, shadows, borderRadius, spacing, animations } from '../styles/theme';
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (selectedQuiz) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animations.timing.normal,
        useNativeDriver: true,
      }).start();
    }
  }, [currentSlide]);

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

            <Animated.View style={[styles.slideContent, { opacity: fadeAnim }]}>
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
            </Animated.View>

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
    backgroundColor: colors.background,
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
    color: colors.text,
  },
  quizCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: borderRadius.md,
    marginBottom: 15,
    ...shadows.medium,
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  quizDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  completedBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.glow,
  },
  completedText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizModal: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.text,
    flex: 1,
  },
  closeButton: {
    fontSize: 28,
    color: colors.text,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.surface,
    marginHorizontal: 20,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  slideCounter: {
    fontSize: 14,
    color: colors.textSecondary,
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
    color: colors.text,
    marginBottom: 30,
    lineHeight: 30,
  },
  optionButton: {
    backgroundColor: colors.surface,
    padding: 18,
    borderRadius: borderRadius.md,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },
  optionButtonSelected: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.accent,
  },
  optionButtonCorrect: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.success,
  },
  optionButtonIncorrect: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.error,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  optionTextSelected: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  optionTextCorrect: {
    color: colors.success,
    fontWeight: 'bold',
  },
  optionTextIncorrect: {
    color: colors.error,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: colors.primaryLight,
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    ...shadows.glow,
  },
  nextButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pointsBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.lg,
    marginRight: 5,
    ...shadows.small,
  },
  pointsText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
