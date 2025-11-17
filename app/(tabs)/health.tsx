/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AutoScrollView from '../../components/AutoScrollView';
import { useRouter } from "expo-router";

export default function Health() {
  const router = useRouter();
 
  return (
    <AutoScrollView style={styles.container}>
      {/* === PAGE TITLE === */}
  <Text style={styles.heading}>{"Our Health".replace(/["']/g, "")}</Text>

      {/* === HERO SECTION === */}
      <View style={styles.hero}>
        

        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            <Text style={styles.colorHealthy}>{"Live Healthy, ".replace(/["']/g, "")}</Text>
            <Text style={styles.colorHappy}>{"Live Happy, ".replace(/["']/g, "")}</Text>
            <Text style={styles.colorWealthy}>{"Live Wealthy".replace(/["']/g, "")}</Text>
          </Text>
          </View>
          <View style={styles.heroImageContainer}>
          <Image
            source={require("../../assets/healthhead.jpg")}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroText}>
            {"Your journey to wellness and financial independence starts here. Our health is our true wealth it gives us energy, focus and freedom to live fully. Every choice what we eat, how we move, how we rest shapes our future. When we care for our health, we care for our dreams, our families and our world. Live Strong, Think clear and Feel happy. Together, we build a healthier tomorrow. Our health, our strength & our future.".replace(/["']/g, "")}
          </Text>
        </View>
      </View>

      {/* === QUOTE HEADER === */}
      <Text style={styles.sectionHeader}>
        {"My health is my greatest wealth.".replace(/["']/g, "")}
      </Text>

      {/* === HEALTH CARDS === */}
      <View style={styles.subImageContainer}>
        {[
          {
            img: require("../../assets/health1.jpg"),
            color: "#fff",
            quotes: [
              "Health and fitness are not temporary, they are my lifetime goal.",
              "Health is not a destination , it’s a lifelong evolution.",
              "Fitness is the art,I practice for life.",
            ],
          },
          {
            img: require("../../assets/health2.jpg"),
            color: "#fff",
            quotes: [
              "I am committed to wellness for life.",
              "Wellness is not a season, it’s my soul’s commitment.",
              "Wellness isn’t a goal, it’s my lifestyle.",
            ],
          },
          {
            img: require("../../assets/health3.jpg"),
            color: "#fff",
            quotes: [
              "I need lifelong health and fitness.",
              "I’m powered by purpose strong for life.",
              "Wellness is my lifetime mission.",
            ],
          },
          {
            img: require("../../assets/health4.jpg"),
            color: "#fff",
            quotes: [
              "I want to be fit, strong and energetic for my entire life.",
              "Forever active, forever alive, forever me.",
              "I live strong. I stay fit. I grow limitless.",
            ],
          },
        ].map((item, index) => (
          <View key={index} style={styles.cardBlock}>
            <Image 
              source={item.img} 
              style={[
                styles.cardImage, 
                index === 0 && { height: 470 }
              ]} 
            />
            <View style={[styles.cardBox, { backgroundColor: item.color }]}>
              {item.quotes.map((q, i) => (
                <Text key={i} style={styles.cardText}>
                  {q.replace(/["']/g, "")}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* === FOOTER QUOTES === */}
           <View style={styles.footerCard}>
        <View style={styles.footer}>
          <Text style={styles.footerQuoteEnglish}>
            {"No medicine is needed, if you allow proper digestion between meals.".replace(/["']/g, "")}
          </Text>
          
          <Text style={styles.footerQuoteTamil}>
            {"  மருந்தென வேண்டாவாம் யாக்கைக்கு அருந்தியது".replace(/["']/g, "")}
          </Text>
          <Text style={styles.footerQuoteTamil}>
            {"  அற்றது போற்றி உணின்.".replace(/["']/g, "")}
          </Text>
          
          <View style={styles.rightAlignContainer}>
            <Text style={styles.footerQuoteTamilsecondtitle}>{"- திருக்குறள்.".replace(/["']/g, "")}</Text>
          </View>

          <Text style={styles.footerQuoteTamilsecond3}>
           {"முன் உண்டது செரித்ததைத் தெளிவாக அறிந்து, அதன்    பின்னரே உண்பானால், அவனுடைய உடலுக்கு ‘மருந்து’ வேண்டாம்.".replace(/["']/g, "")}
          </Text>

          <Text style={styles.footerQuoteTamilsecond4}>
            {'"தண்ணீரைச் சாப்பிடு, உணவை அருந்து" \n உண்மையான ஆரோக்கிய வாழ்க்கையின் ரகசியம்.'}
          </Text>

          <Text style={styles.footerQuotenew}>
            💧 "Eat water, Sip food"{'\n'} The secret of true healthy life.
          </Text>
        </View>
      </View>

      {/* === LEARN MORE BUTTON === */}
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => router.push("/(tabs)/wealth")}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>View More</Text>
      </TouchableOpacity>

      {/* === FINAL FOOTER === */}
      <View style={styles.footer2}>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1762702091/dailymoney222_guqvud.png",
          }}
          style={styles.footerLogo2}
        />
        <Text style={styles.footerTitle2}></Text>
        <Text style={styles.footerSubtitle2}>
          Independent for Entire Life
        </Text>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingVertical: 20 },

  heading: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
    marginVertical: 20,
    backgroundColor: '#047871',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    minWidth: 220,
  },

  hero: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
  },


  heroImageContainer: {
    width: 320,
    height: 320,
    overflow: "hidden",
    marginBottom: 15,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 150,
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },

  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover" as const,
  },

  heroContent: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },

  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 35,
    marginBottom: 10,
    textAlign: "center",
  },

  colorHealthy: { color: "#d32a2a" },
  colorHappy: { color: "#047871" },
  colorWealthy: { color: "#7a7272" },

  heroText: {
    fontSize: 17,
    fontWeight: "700",
    marginVertical: 15,
    color: "#333",
    textAlign: "left",
    lineHeight: 25,
  },

  sectionHeader: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 40,
    color: "#c00606",
  },

  subImageContainer: { paddingHorizontal: 20, marginBottom: 20  },
  cardBlock: {
  marginBottom: 40,
  borderRadius: 20,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 4,
},

  cardImage: {
    width: "100%",
    height: 500,
    marginBottom: 15,
    resizeMode: "cover" as const,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 80,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cardBox: {
    borderRadius: 12,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  cardText: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 5,
    lineHeight: 25,
    minHeight:60,
  },

  footerCard: { paddingHorizontal: 20, marginTop: 40 },
  footer: {
    backgroundColor: "#817676",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },

  footerQuoteEnglish: {
  color: "#ffe600",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    marginLeft:20
  },


   footerQuotenew: {
  color: "#ffe600",
    fontWeight: "700",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    marginLeft:60
  },
  footerQuoteTamil: {
  color: "#1aff7a",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "left",
  },

  footerQuoteTamilsecond: {
    color: "#fffb2c",
    fontWeight: "700",
    fontSize: 10,
    textAlign: "left",
  },

  leftAlignContainer: {
    width: "85%",
    alignItems: "flex-start",
  },

  rightAlignContainer: {
    width: "90%",
    alignItems: "flex-end",
  },

  footerQuoteTamilsecondtitle: {
  color: "#1aff7a",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    marginVertical: 5,
  },

  footerQuoteTamilsecond3: {
  color: "#fff",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  footerQuoteTamilsecond4: {
  color: "#1aff7a",
    fontWeight: "600",
    fontSize: 10,
    textAlign: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
    marginLeft:20
  },

  btnPrimary: {
    backgroundColor: "#0b3a55",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 30,
    alignSelf: "center",
  },

  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  footer2: { alignItems: "center", paddingVertical: 30,backgroundColor:'#1f2937' },
  footerLogo2: {
    width: 100,
    height: 60,
    resizeMode: "contain" as const,
    marginBottom: 10,
  },
  footerTitle2: { fontSize: 20,marginTop:-15, fontWeight: "700", color: "#fffb2c" },
  footerSubtitle2: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});
