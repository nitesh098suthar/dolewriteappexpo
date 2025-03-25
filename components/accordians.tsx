import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const FAQData = [
  {
    id: 1,
    question: "Who can use Dolewrite?",
    answer:
      "Dolewrite is designed for children aged 3-12 years old. Our content is carefully curated and age-appropriate, with different difficulty levels to match your child's learning stage.",
  },
  {
    id: 2,
    question: "How does the learning path personalization work?",
    answer:
      "Our system observes your child's learning patterns, pace, and preferences. It then automatically adjusts the difficulty, suggests relevant content, and creates a customized learning journey that keeps them engaged and challenged at the right level.",
  },
  {
    id: 3,
    question: "Can parents track their child's progress?",
    answer:
      "Yes! Parents have access to a detailed dashboard showing their child's learning progress, time spent on different subjects, skill improvements, and achievements. You can also receive weekly progress reports via email.",
  },
  {
    id: 4,
    question: "Is internet connection required to use Dolewrite?",
    answer:
      "Yes, internet connection is required for the best experience.",
  },
  {
    id: 5,
    question: "What subjects are covered in Dolewrite?",
    answer:
      "Dolewrite covers core subjects including Mathematics, English, Hindi, Environmental Science."
  },
];

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 300,
}: any) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <View style={styles.faqItem}>
      <Text style={styles.answerText}>{answer}</Text>
    </View>
  );
}

function Parent({ open, item }: any) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} viewKey={`Accordion_${item.id}`}>
        <FAQItem question={item.question} answer={item.answer} />
      </AccordionItem>
    </View>
  );
}

export default function Accordions() {
  const expandedStates = FAQData.reduce((acc, item) => {
    acc[item.id] = useSharedValue(false);
    return acc;
  }, {} as { [key: number]: Animated.SharedValue<boolean> });

  const toggleAccordion = (id: number) => {
    Object.keys(expandedStates).forEach((key) => {
      const numKey = parseInt(key);
      expandedStates[numKey].value =
        numKey === id ? !expandedStates[numKey].value : false;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <View style={styles.faqList}>
        {FAQData.map((item) => (
          <View key={item.id} style={styles.faqContainer}>
            <Pressable
              onPress={() => toggleAccordion(item.id)}
              style={({ pressed }) => [
                styles.questionButton,
                pressed && styles.questionButtonPressed,
              ]}
            >
              <View style={styles.questionContent}>
                <Text style={styles.listNumber}>{item.id}.</Text>
                <Text style={styles.questionText}>{item.question}</Text>
                <Image
                  source={require("@/assets/icons/chevron.png")}
                  style={[
                    styles.chevron,
                    {
                      transform: [
                        {
                          rotate: expandedStates[item.id].value
                            ? "180deg"
                            : "0deg",
                        },
                      ],
                    },
                  ]}
                />
              </View>
            </Pressable>
            <Parent open={expandedStates[item.id]} item={item} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  faqList: {
    paddingHorizontal: 4,
  },
  faqContainer: {
    marginBottom: 16,
  },
  questionButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  questionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  questionButtonPressed: {
    opacity: 0.7,
  },
  listNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginRight: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  faqItem: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  answerText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "#666",
  },
  parent: {
    width: "100%",
  },
  wrapper: {
    width: "100%",
    position: "absolute",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
});
