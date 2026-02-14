import { BRAND_TEXT_SEGMENTS } from "@components/animated-splash/constants";
import { styles } from "@components/animated-splash/styles";
import { Text } from "react-native";

export const BrandText = () => {
    return (
      <Text style={styles.brandText}>
        {BRAND_TEXT_SEGMENTS.map(({ text, color }) => (
          <Text key={text} style={[styles.brandSegment, { color }]}>
            {text}
          </Text>
        ))}
      </Text>
    );
  };