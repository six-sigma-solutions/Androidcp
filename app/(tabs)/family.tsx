import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import AutoScrollView from '../../components/AutoScrollView';
import { useResponsive } from '../../hooks/use-responsive';

import { useRouter } from "expo-router";



export default function Family() {
   const router = useRouter();
   const { isTablet, isPhone, width } = useResponsive();
  const steps = [
    {
      id: 1,
      img: require('../../assets/family1.png'),
      quote:
        ' I have secured my family\’s health, education and finances and aim to ensure long term security, growth and happiness for future generations.'.replace(/["']/g, ""),
    },
    {
      id: 2,
      img: require('../../assets/family2.png'),
      quote:
        'I’ve secured my family\’s well being and plan to expand their opportunities, investing in their safety, education and lifestyle.'.replace(/["']/g, ""),
    },
    {
      id: 3,
      img: require('../../assets/family3.png'),
      quote:
        'I’ve secured my children\’s future through education, savings and guidance, aiming for long term financial independence.'.replace(/["']/g, ""),
    },
    {
      id: 4,
      img: require('../../assets/family4.png'),
      quote:
        'I prioritize my family, ensuring their financial security and providing emotional support even after me.'.replace(/["']/g, ""),
    },
  ];

  return (
    <AutoScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.familyBox}>
          <Text style={styles.familyBoxText}>Our Family</Text>
        </View>
        <Text style={styles.protectGrowProsper}>Protect. Grow. Prosper</Text>
      </View>
     

      {/* Family Steps */}
      {steps.map((step) => (
        <View key={step.id} style={styles.step}>
          <Image
            source={step.img}
            style={[
              styles.familyImageCard,
              {
                height:
                  step.id === 2
                    ? isTablet
                      ? 520
                      : isPhone
                      ? 223
                      : 350
                    : step.id === 1
                    ? isTablet
                      ? 400
                      : isPhone
                      ? 240
                      : 300
                    : isTablet
                    ? 450
                    : isPhone
                    ? 250
                    : 300,
                width: isTablet ? '100%' : isPhone ? '95%' : '90%',
              },
            ]}
          />
          <View style={styles.textContainer}>
            <Text style={styles.quote}>{step.quote.replace(/["']/g, "")}</Text>
          </View>
        </View>
      ))}

      {/* Blog Section */}
      <View style={styles.blogSection}>
       
        <TouchableOpacity
          style={styles.readMoreBtn}
          onPress={() => router.push("/(tabs)/mylife/entrepreneur")}
        >
          <Text style={styles.readMoreText}>View More →</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1762702091/dailymoney222_guqvud.png",
                }}
                style={styles.footerLogo}
              />
              <Text style={styles.footerTitle}></Text>
              <Text style={styles.footerSubtitle}>Independent for Entire Life</Text>
            </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    padding: 20,
    alignItems: 'center',
  },
  familyBox: {
    backgroundColor: '#08807b',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 18,
    alignSelf: 'flex-start',
  },
  familyBoxText: {
    color: '#fff',
    fontSize: 38,
    fontWeight: '400',
    fontFamily: 'sans-serif',
  },
  protectGrowProsper: {
    color: '#d60000',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -25,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 25, 
    fontWeight: "600", 
    justifyContent: "center",
    color: '#001f54',
    textAlign: 'justify',

  },
  highlightText: {
  backgroundColor:'#047871',
  color: '#fff',
  paddingHorizontal:8,
 
  borderRadius: 6,
  fontWeight: 'bold',
 
  
  
  },
  highlightColumn: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ✅ Vertical Step Layout
  step: {
    flexDirection: 'column', // image top, text below
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  familyImageCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 60,
    marginBottom: 18,
    resizeMode: 'cover',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    overflow: 'hidden',
  },
  textContainer: {
    width: '95%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 22,
    fontWeight: "500", 
    textAlign: 'center',
  },

  blogSection: {
    padding: 20,
    alignItems: 'center',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  blogSubtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
  },
  readMoreBtn: {
  backgroundColor: '#0b3a55',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
  },

 
  footer: { alignItems: "center", paddingVertical: 30 ,backgroundColor:'#1f2937'},
  footerLogo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  footerTitle: { fontSize: 20, fontWeight: "700", marginTop:-15, color: "#fffb2c" },
  footerSubtitle: { fontSize: 16, fontWeight: "700", color: "#fffb2c" },
});