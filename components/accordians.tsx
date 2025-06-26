import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  Linking,
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
    question: "How does Dolewrite help?",
    answer:
      "At Dolewrite, our mission is to make learning fun and exciting for young children! We create playful and easy-to-understand lessons to help kids grow, explore, and discover the world around them. We believe every child can learn amazing new things, and we are here to help them start their big adventure in a fun and colourful way!",
  },
  {
    id: 2,
    question: "How can I purchase a course?",
    answer:
      "To purchase a course, visit our website at https://www.dolewrite.com/. Click on the 'Subscription' tab at the top of the page. Enter the number of IDs you need and click 'Buy Now' to make the payment. Once done, head to your Profile to view and download your IDs.",
  },
  {
    id: 3,
    question: "Where can I watch my purchased courses?",
    answer:
      "You can watch your purchased courses in 'Your Courses' present on the home screen of your app. Simply click on the particular subject you want to watch and start learning your course.",
  },
  {
    id: 4,
    question: "What are the other benefits of Dolewrite?",
    answer:
      "Another benefit of Dolewrite is that it allows you to take and review an assessment after each lesson, helping reinforce your understanding.",
  },
  {
    id: 5,
    question: "How can we contact you for help?",
    answer:
      "You can contact us or get in touch with our team through the phone number +91-9782222212 or via the provided email link: support@dolewrite.com.",
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

function FAQItem({ answer }: { answer: string }) {
  const renderTextWithLink = (text: string) => {
    const parts = text.split(
      /(https?:\/\/[^\s]+|[\w.-]+@[\w.-]+\.\w+|\+91[-\s]?\d{10})/g
    );

    return parts.map((part, index) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(part)}
          >
            {part}
          </Text>
        );
      } else if (part.match(/^[\w.-]+@[\w.-]+\.\w+$/)) {
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(`mailto:${part}`)}
          >
            {part}
          </Text>
        );
      } else if (part.match(/^\+91[-\s]?\d{10}$/)) {
        const phoneNumber = part.replace(/[-\s]/g, "");
        const whatsappLink = `https://wa.me/${phoneNumber.replace("+", "")}`;
        return (
          <Text
            key={index}
            style={styles.linkText}
            onPress={() => Linking.openURL(whatsappLink)}
          >
            {part}
          </Text>
        );
      } else {
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  return (
    <View style={styles.faqItem}>
      <Text style={styles.answerText}>{renderTextWithLink(answer)}</Text>
    </View>
  );
}

function Parent({ open, item }: any) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} viewKey={`Accordion_${item.id}`}>
        <FAQItem answer={item.answer} />
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
      <Text style={styles.title}>FAQs</Text>
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
                <Text style={styles.questionText}>
                  {`${item.id}. ${item.question}`}
                </Text>
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
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
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
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
    color: "#333",
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  chevron: {
    width: 20,
    height: 20,
    tintColor: "black",
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
