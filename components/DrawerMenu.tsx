// Utility style for full dynamic image fit
export const fullImage = { width: '100%', height: '100%', resizeMode: 'cover' };

// Usage: <Image source={...} style={fullImage} />

import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type DrawerMenuProps = {
  onClose?: () => void;
};

function DrawerMenu({ onClose }: DrawerMenuProps) {
  const router = useRouter();
  
  const handleNavigate = (to: string) => {
    console.log(`[DrawerMenu] Attempting to navigate to: ${to}`);
    let finalRoute = null;
    if (to === 'contact') {
      finalRoute = '/contact';
    } else {
      const aboutRoute = to.startsWith('about/') ? '/' + to : null;
      const mylifeRoute = to.startsWith('mylife/') ? '/(tabs)/mylife/' + to.split('/')[1] : null;
      const tabsRoute = (!aboutRoute && !mylifeRoute) ? '/(tabs)/' + to : null;
      finalRoute = aboutRoute || mylifeRoute || tabsRoute;
      if (to === 'life') {
        Alert.alert('Not implemented', 'No "life" route exists.');
        return;
      }
    }
    if (onClose) onClose();
    console.log(`[DrawerMenu] Final route resolved: ${finalRoute}`);
    if (finalRoute) {
      router.push(finalRoute);
    } else {
      console.error(`[DrawerMenu] No route found for: ${to}`);
    }
  };

  // Sign out functionality removed - direct home page access

  return (
    <ScrollView
      style={[styles.container, { zIndex: 1002, elevation: 30 }]}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
      showsVerticalScrollIndicator={true}
      nestedScrollEnabled={true}
      accessible accessibilityLabel="Drawer menu"
      accessibilityViewIsModal
      importantForAccessibility="yes"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>DM</Text>
        <TouchableOpacity
          onPress={onClose}
          style={styles.hamburger}
          accessibilityLabel="Close menu"
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Profile/Contact - Sign out removed */}
      <View style={styles.profileRow}>
  <Ionicons name="person-circle-outline" size={24} color="#fff" />
        <Text style={styles.welcomeText}>Welcome to DM</Text>
        <TouchableOpacity onPress={() => handleNavigate('contact')} style={styles.contactButton}>
          <MaterialIcons name="call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Main Links */}
      <TouchableOpacity style={styles.link} onPress={() => handleNavigate('home')}>
        <Text style={styles.linkText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => handleNavigate('health')}>
        <Text style={styles.linkText}>Health</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => handleNavigate('wealth')}>
        <Text style={styles.linkText}>Wealth</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => handleNavigate('family')}>
        <Text style={styles.linkText}>Family</Text>
      </TouchableOpacity>
      {/* My Life with submenus */}
      <View style={styles.linkRow}>
        <Text style={styles.linkText}>My Life ▼</Text>
      </View>
      <View style={styles.subMenu}>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('mylife/entrepreneur')}>
          <Text style={styles.subLinkText}>Entrepreneur</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('mylife/income')}>
          <Text style={styles.subLinkText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('mylife/womenempowerment')}>
          <Text style={styles.subLinkText}>Women Empowerment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('mylife/students')}>
          <Text style={styles.subLinkText}>Students</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('mylife/elder')}>
          <Text style={styles.subLinkText}>Elders</Text>
        </TouchableOpacity>
      </View>
      
        
        
      
      {/* About with submenus */}
      <View style={[styles.linkRow, { marginTop: 10 }]}>
        <Text style={styles.linkText}>About ▼</Text>
      </View>
      <View style={styles.subMenu}>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/overview')}>
          <Text style={styles.subLinkText}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.link]} 
          onPress={() => handleNavigate('about/vision')}
        >
          <Text style={[styles.subLinkText, { fontWeight: '600' }]}>Vision & Mission</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/founders')}>
          <Text style={styles.subLinkText}>Founder's Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/president')}>
          <Text style={styles.subLinkText}>President's Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/core-team')}>
          <Text style={styles.subLinkText}>Core Team</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.link, { backgroundColor: '#b70404ff', borderRadius: 4 }]} onPress={() => handleNavigate('about/core-values')}>
          <Text style={styles.subLinkText}>Core Values</Text>
        </TouchableOpacity>

       
        
        

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131d35ff', // dark blue
    paddingTop: 30,
    paddingHorizontal: 10,
    minHeight: 300,
    maxHeight: 540,
    minWidth: 260,
    alignSelf: 'center',
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 10,
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    // elevation for Android
    elevation: 30,
    zIndex: 1002,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
    backgroundColor: '#db12c1ff', // lighter blue
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  hamburger: {
    padding: 4,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  welcomeText: {
    marginLeft: 8,
    color: '#e9e2e3ff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    paddingVertical: 8,
    paddingLeft: 8,
    backgroundColor: '#162447', // dark blue for all menu items
    borderRadius: 12,
    marginBottom: 10,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 8,
    backgroundColor: '#162447',
    borderRadius: 12,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 18,
    color: '#fff',
  },
  subMenu: {
    paddingLeft: 8,
    paddingBottom: 10,
    backgroundColor: '#162447',
    borderRadius: 12,
    marginBottom: 10,
  },
  subLinkText: {
    fontSize: 16,
    color: '#c7d0e0',
    paddingVertical: 2,
  },
  // Add highlight style for active/selected items if needed
  activeLink: {
  },
  contactButton: {
    backgroundColor: '#1ec773', // green
    borderRadius: 20,
    padding: 6,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerMenu;

