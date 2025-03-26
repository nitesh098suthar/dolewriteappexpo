import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import PurchasedCourse from "@/components/purchased-course";

const { width } = Dimensions.get("window");

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/bg.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.contentContainer}>
          <LinearGradient
            colors={["rgba(13, 31, 51, 0.5)", "#F0721B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBox}
          >
            <View style={styles.textContainer}>
              <View style={styles.headingContainer}>
                <View style={styles.leafContainer}>
                  <Image
                    source={require("@/assets/images/home-leaf.png")}
                    style={styles.leafImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.heading}>Dolewrite</Text>
              </View>
              <Text style={styles.paragraph}>
                A New Way to Learn: Courses that Make Learning Fun and Easy
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/home-main.png")}
                style={styles.rightImage}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
          <PurchasedCourse />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    zIndex: 0,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    minHeight: "100%",
    paddingBottom: 80,
  },
  contentContainer: {
    marginTop: 68,
  },
  gradientBox: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 180,
    width: "100%",
    alignSelf: "center",
    overflow: "hidden",
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    position: "relative",
  },
  leafContainer: {
    position: "absolute",
    left: -12,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  leafImage: {
    width: 20,
    height: 20,
    bottom: 16,
    right: 4,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 0,
  },
  paragraph: {
    fontSize: 15,
    color: "white",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  rightImage: {
    width: "170%",
    height: 200,
    position: "absolute",
    bottom: -26,
    right: -30,
  },
});
