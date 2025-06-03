import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import Header from '../../Components/Home/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

const contactMethods = [
  {
    type: 'Call us',
    description: 'Our team is on the line\nMon-Fri • 9–17',
    iconName: 'phone',
    url: 'tel:+1234567890',
  },
  {
    type: 'Email us',
    description: 'Our team is online\nMon-Fri • 9–17',
    iconName: 'envelope',
    url: 'mailto:support@example.com',
  },
];

const socialAccounts = [
  {
    name: 'Instagram',
    iconName: 'instagram',
    url: 'https://www.instagram.com/',
    color: '#C13584',
    followers: '4.8K followers',
    posts: '78 Posts',
  },
  {
    name: 'Telegram',
    iconName: 'telegram',
    url: 'https://telegram.org/',
    color: '#26A5E4',
    followers: '13K followers',
    posts: '66 Posts',
  },
  {
    name: 'Facebook',
    iconName: 'facebook',
    url: 'https://www.facebook.com/',
    color: '#1877F2',
    followers: '3.8K followers',
    posts: '138 Posts',
  },
  {
    name: 'WhatsApp',
    iconName: 'whatsapp',
    url: 'https://www.whatsapp.com/',
    color: '#25D366',
    followers: '',
    posts: '',
    availability: 'Available Mon-Fri • 9–17',
  },
];
export default function ContactUs() {
  const openLink = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn('URL not supported:', url);
    //   Alert.alert("Can't open this URL", url);
    }
  } catch (error) {
    console.error('Linking error:', error);
    // Alert.alert('An error occurred', error.message || 'Unknown error');
  }
};

  return (
    <>
      <Header title={'Contact Us'} />
      <View style={styles.container}>
        <Text style={styles.subHeader}>
          Don’t hesitate to contact us whether you have a suggestion on our
          improvement, a complaint to discuss or an issue to solve.
        </Text>

        {/* Contact Methods (Call, Email) */}
        <View style={styles.contactMethods}>
          {contactMethods.map(method => (
            <TouchableOpacity
              key={method.type}
              style={styles.methodCard}
              onPress={() => (method.url ? openLink(method.url) : null)}
              activeOpacity={method.url ? 0.7 : 1}>
              <Icon name={method.iconName} size={24} color="#333" />
              <Text style={styles.methodTitle}>{method.type}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media Links */}
        <Text style={styles.sectionTitle}>Contact us in social media</Text>
        {socialAccounts.map(account => (
          <TouchableOpacity
            key={account.name}
            style={styles.socialCard}
            onPress={() => openLink(account.url)}>
            <View style={styles.socialContent}>
              <Icon name={account.iconName} size={24} color={account.color} />
              <View style={styles.socialText}>
                <Text style={styles.socialName}>{account.name}</Text>
                <View style={styles.socialStats}>
                  {account.followers ? (
                    <Text style={styles.statsText}>{account.followers}</Text>
                  ) : (
                    <Text style={styles.availability}>
                      {account.availability}
                    </Text>
                  )}
                  <Text style={styles.statsText}>
                    {account.followers || account.availability}
                    {account.posts ? ` • ${account.posts}` : ''}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E6F0FA',
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 17,
    color: '#666',
    marginVertical: 10,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  contactMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  methodCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  methodDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  socialCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    marginLeft: 15,
  },
  socialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  socialStats: {
    flexDirection: 'row',
    marginTop: 5,
  },
  statsText: {
    fontSize: 12,
    color: '#666',
  },
  availability: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  icon: {
    fontSize: 24,
    color: '#333',
  },
});
