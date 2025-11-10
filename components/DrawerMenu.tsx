
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type DrawerMenuProps = {
  onClose?: () => void;
};

function DrawerMenu({ onClose }: DrawerMenuProps) {
  const router = useRouter();
  const { user } = useAuth();
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

  const handleSignOut = async () => {
    try {
      console.log('[DrawerMenu] Attempting to sign out...');
      await signOut(auth);
      console.log('[DrawerMenu] Firebase signOut completed');
      
      if (onClose) onClose();
      
      // Manual navigation as backup
      console.log('[DrawerMenu] Manually navigating to signin...');
      router.replace('/signin');
      
      console.log('[DrawerMenu] Sign out successful');
    } catch (e) {
      console.error('[DrawerMenu] Sign out error:', e);
      Alert.alert('Sign out failed', typeof e === 'object' && e && 'message' in e ? (e as any).message : String(e));
    }
  };

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
          <Ionicons name="close" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Profile/Sign out/Contact */}
      <View style={styles.profileRow}>
        <Ionicons name="person-circle-outline" size={24} color="#333" />
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.signOut}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('contact')}>
          <MaterialIcons name="call" size={22} color="#333" style={{ marginLeft: 12 }} />
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
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/founders-message')}>
          <Text style={styles.subLinkText}>Founder's Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => handleNavigate('about/president-message')}>
          <Text style={styles.subLinkText}>President Message</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.link, { backgroundColor: '#f8f9fa', borderRadius: 4 }]} 
          onPress={() => handleNavigate('about/vision-mission')}
        >
          <Text style={[styles.subLinkText, { fontWeight: '600' }]}>Vision & Mission</Text>
        </TouchableOpacity>
       
        
        

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 10,
    minHeight: 300,
    maxHeight: 540,
    minWidth: 260,
    alignSelf: 'center',
    borderRadius: 12,
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
    color: '#333',
    backgroundColor: '#eee',
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
  signOut: {
    marginLeft: 8,
    color: '#333',
    fontWeight: 'bold',
  },
  link: {
    paddingVertical: 8,
    paddingLeft: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 8,
  },
  linkText: {
    fontSize: 18,
    color: '#222',
  },
  subMenu: {
    paddingLeft: 18,
    paddingBottom: 10,
  },
  subLinkText: {
    fontSize: 16,
    color: '#444',
    paddingVertical: 2,
  },
});

export default DrawerMenu;

