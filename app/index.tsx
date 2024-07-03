import {View, Text, StyleSheet, Image} from "react-native";
import {useLocale} from "@/providers/LocaleProvider/LocaleProvider";
import {ButtonVariants, ThemedButton} from "@/components/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useRouter} from "expo-router";

export default function IndexScreen() {
  const { i18n } = useLocale();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const goToAddWord = (): void => {
      router.push('/game/addWord');
  }

  const goToRepeatWords = (): void => {
    router.push('/game/repeatWords');
  }

  const styles = StyleSheet.create({
    appName: {
      fontSize: 36,
      fontWeight: 'bold',
      marginHorizontal: 'auto',
      color: Colors[colorScheme ?? 'light'].text,
    },
    yellow: {
      color: Colors.yellow,
    },
    logo: {
      width: 150,
      height: 150,
      marginHorizontal: 'auto',
      marginTop: 50,
      borderRadius: 12,
    },
    buttonsContainer: {
      gap: 10,
      marginTop: 100,
      alignItems: 'center'
    }
  })
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 100, backgroundColor: Colors[colorScheme ?? 'light'].background, }}>
      <Text style={styles.appName}>
        {i18n.t('remember')}
        <Text style={styles.yellow}>{i18n.t('me')}</Text>
      </Text>
      <Image style={styles.logo} source={require('../assets/images/icon.png')} />
      <View style={styles.buttonsContainer}>
        <ThemedButton variant={ButtonVariants.Yellow} text={i18n.t('buttons.addWord')} onPress={goToAddWord}></ThemedButton>
        <ThemedButton text={i18n.t('buttons.repeatWords')} onPress={goToRepeatWords}></ThemedButton>
        <ThemedButton text={i18n.t('buttons.repeatTranslations')}></ThemedButton>
      </View>
      <View style={{ marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
      <Text>@ddgame</Text>
      <Text style={{ fontSize: 9}}>Remember icons created by Freepik - Flaticon</Text>
      </View>
    </SafeAreaView>
  );
}