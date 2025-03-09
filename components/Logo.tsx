import { Link } from "expo-router";
import { Image, StyleSheet, Pressable } from "react-native";
const IconImage = require("../assets/images/icon-without-bg.png");

export default function Logo() {
  return (
    <Link asChild href="/">
      <Pressable>
        <Image source={IconImage} style={styles.image} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
