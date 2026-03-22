import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GOLD = "#D4A853";
const BG = "#0D1117";
const CARD_BG = "#161B22";
const BORDER = "#30363D";

const categories = [
  { label: "Antique Shops", icon: "storefront-outline" as const, count: "100+" },
  { label: "Breweries", icon: "beer-outline" as const, count: "Local craft" },
  { label: "Restaurants", icon: "restaurant-outline" as const, count: "Dining" },
  { label: "Activities", icon: "map-outline" as const, count: "Royal Gorge" },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.badge}>The Antique Capital of Colorado</Text>
        <Text style={styles.heroTitle}>Discover{"\n"}Florence, CO</Text>
        <Text style={styles.heroSub}>
          100+ antique shops, craft breweries, and Colorado adventure — just 15 minutes from the Royal Gorge.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openURL("https://visitflorence.co")}
        >
          <Text style={styles.buttonText}>Explore the Directory</Text>
          <Ionicons name="arrow-forward" size={18} color={BG} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Browse by Category</Text>
      <View style={styles.grid}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.label} style={styles.card}>
            <Ionicons name={cat.icon} size={28} color={GOLD} />
            <Text style={styles.cardLabel}>{cat.label}</Text>
            <Text style={styles.cardCount}>{cat.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="location-outline" size={20} color={GOLD} />
        <Text style={styles.infoText}>
          Florence is located in Fremont County, Colorado — 45 miles west of Pueblo and 15 minutes east of Canon City.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { padding: 20, paddingBottom: 40 },
  hero: { marginBottom: 32 },
  badge: {
    color: GOLD,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  heroTitle: {
    color: "#F0F6FC",
    fontSize: 38,
    fontWeight: "700",
    lineHeight: 44,
    marginBottom: 16,
  },
  heroSub: {
    color: "#8B949E",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: GOLD,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 44,
  },
  buttonText: {
    color: BG,
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#F0F6FC",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  card: {
    backgroundColor: CARD_BG,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    width: "47%",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
  },
  cardLabel: { color: "#F0F6FC", fontSize: 14, fontWeight: "600", textAlign: "center" },
  cardCount: { color: GOLD, fontSize: 12 },
  infoCard: {
    backgroundColor: CARD_BG,
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  infoText: { color: "#8B949E", fontSize: 14, lineHeight: 22, flex: 1 },
});
