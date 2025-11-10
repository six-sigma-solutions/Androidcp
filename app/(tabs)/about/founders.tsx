import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AutoScrollView from '../../../components/AutoScrollView';
import { Link } from 'expo-router'; // or react-navigation if using that

const founder = {
  name: "Dr.V.Chellapondy ",
  role: "Founder & CEO",
  image: require('../../../assets/sir.png'), // Fixed path: app/(tabs)/about/ -> ../../../assets/
};

export default function FounderMsg() {
  return (
    <AutoScrollView style={styles.container}>
      <View style={styles.founderPageSection}>
        {/* Main Card */}
        <View style={styles.founderMessageCard}>
          {/* Header Section */}
          <View style={styles.cardHeaderBg}>
            <Text style={styles.headerTitle}>Founder&apos;s Message</Text>
            <Text style={styles.headerSubtitle}>A Note on Vision and Commitment</Text>
          </View>

          {/* Founder Profile */}
          <View style={styles.founderProfileArea}>
            <Image source={founder.image} style={styles.founderImage} />
            <Text style={styles.founderName}>{founder.name}</Text>
            <Text style={styles.founderRole}>{founder.role}</Text>
          </View>
          {/* Life Journey Content */}
          <View style={styles.lifeJourneySection}>
            <ScrollView
              contentContainerStyle={styles.lifeJourneyContainer}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.lifeJourneyTitle}>Life Journey</Text>

              <Text style={styles.lifeJourneyLede}>
                I'm Chellapondy Vellaiswamy, with over 35 years of experience across
                Media, Finance, and Wellness.
              </Text>

              <Text style={styles.lifeJourneyParagraph}>
                From launching Kailash Cable Network in 1990 to serving as Deputy
                Director — Distribution at Tamilthirai TV and AVP at India Infoline
                Ltd., I have developed deep expertise in leadership, business growth
                and people development.
              </Text>

              <Text style={styles.lifeJourneyParagraph}>
                In 2010, I faced the worst health challenge of my life. There was a
                time I feared losing everything — my family, my wife and my children.
                They too were thrown into a difficult and uncertain phase.
              </Text>

              <Text style={styles.lifeJourneyParagraph}>
                At that moment, I made a decision — to fight back, to rise and to
                reclaim my life. Through determination, discipline and faith, I
                overcame those struggles and rebuilt myself from within.
              </Text>

              <Text style={styles.lifeJourneyParagraph}>
                Since then, I've dedicated my life to wellness — helping over 100,000 (One Lakh)
                people transform their health and wealth, around the world while
                building an organization of 5,000+ associates. My journey has taken me
                across 15+ countries, expanding my global learning and vision for
                holistic well-being.
              </Text>
              
              <Text style={styles.lifeJourneynew}>
                Today, I am settled in life. My two children are
                well-settled too. Together, we live a healthy, wealthy,
                happy and heavenly life. And to crown it all, I have
                earned my Doctorate from Global University.
                This moment is a reminder that when passion meets
                persistence, success becomes inevitable.
                </Text>
                <Text style={styles.lifeJourneyParagraph}>
               I continue to live each day with gratitude, strength, and
               purpose — empowering others to achieve a balanced life
               of health, happiness, and financial freedom.</Text>

              <Text style={styles.lifeJourneyCloser}>
                And through all of this, I've been fulfilling my childhood ambition {'\n'}
                "I want to live after my death". By creating lasting impact, touching
                lives, and inspiring others to live fully — my journey continues
                beyond me.
              </Text>

            </ScrollView>
          </View>

          <View style={styles.messageSection}>
            <Image
              source={require('../../../assets/founder2.jpg')}
              style={styles.messageImage}
            />
          </View>


          {/* View More Button */}
          <View style={styles.viewMoreLinkMyLife}>
            <Link href="/(tabs)/about/president" asChild>
              <TouchableOpacity style={styles.viewMore}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Footer Section */}
          <View style={styles.cardFooterBg}>
            <Image
              source={{  uri: "https://res.cloudinary.com/dgay8ba3o/image/upload/v1762702091/dailymoney222_guqvud.png" }}
              style={styles.footerLogo}
            />
            <Text style={styles.footerTitle2}></Text>
            <Text style={styles.footerSubtitle2}>Independent for Entire Life </Text>
          </View>
        </View>
      </View>
    </AutoScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },

  founderPageSection: {
    paddingVertical: 80,
    paddingHorizontal: 16,
    minHeight: '100%',
    backgroundColor: '#f9fafb',
  },

  founderMessageCard: {
    width: "100%",
    alignSelf: 'center',
    backgroundColor: '#047871',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },

  /* Header */
  cardHeaderBg: {
    backgroundColor: '#047871',
    paddingVertical: 48,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#99f6e4',
    textAlign: 'center',
  },

  /* Founder Profile */
  founderProfileArea: {
    alignItems: 'center',
    marginTop: -44,
    paddingHorizontal: 24,
  },
  founderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: 25,
  },

  founderName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
  },
  founderRole: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: '600',
    color: '#99f6e4',
  },

  /* Message Content */
  messageContent: {
    padding: 10,
    width: "100%",
  },
  messageQuote: {
    fontSize: 16,
    lineHeight: 26,
    color: '#fff',
    marginBottom: 32,
    paddingLeft: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    justifyContent: "flex-end",
  },
  signature: {
    color: '#00ecd9ff',
    fontSize: 18,
    fontWeight: '600',
  },
  messageSection: {
    marginVertical: 48,
    alignItems: 'center',

  },
  messageImage: {
    width: '95%',
    height: 480,
    objectFit: 'cover',
    resizeMode: 'cover',
  },

  /* View More Button */
  viewMoreLinkMyLife: {
    alignItems: 'center',
    marginBottom: 24,
  },
  viewMore: {
    backgroundColor: '#d32a2a',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  viewMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /* Footer */
  cardFooterBg: {
    backgroundColor: '#1f2937',
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerLogo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  footerTitle2: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#facc15',
    marginTop: -50,
    textTransform: 'uppercase',
  },
  footerSubtitle2: {
    fontSize: 20,
    color: '#fde047',
    marginTop: 4,
  },

  /* Life Journey Styles */
  lifeJourneySection: {
    backgroundColor: '#0b0b0b',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lifeJourneyContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  lifeJourneyTitle: {
    color: '#d4af37',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.6,
    textAlign: 'center',
    marginBottom: 20,
  },
  lifeJourneyLede: {
    color: '#f3e9c8',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'justify',
  },
  lifeJourneyParagraph: {
    color: '#f3e9c8',
    opacity: 0.95,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
    textAlign: 'justify',
  },
  lifeJourneynew: {
    color: '#d4af37',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 10,
    marginBottom: 14,
    textAlign: 'justify',

  },
  lifeJourneyCloser: {
    color: 'yellow',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '600',
  },
});