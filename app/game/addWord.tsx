import {StyleSheet, Text, TextInput, View} from "react-native";
import {useLocale} from "@/providers/LocaleProvider/LocaleProvider";
import {ButtonVariants, ThemedButton} from "@/components/ThemedButton";
import {SafeAreaView} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import {ThemedInput} from "@/components/ThemedInput";
import {useState} from "react";
import {useSQLiteContext} from "expo-sqlite";
import {useRouter} from "expo-router";

export default function AddWordScreen() {
  const { i18n } = useLocale();
  const colorScheme = useColorScheme();
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const db = useSQLiteContext();
  const router = useRouter();

  const addWordClick = () => {
    if (word.length && translation.length) {
      addWordToDb().then(() => {
        router.back();

        alert(i18n.t('snackbars.wordAdded'));
      }).catch(() => {
        alert(i18n.t('errors.cannotAddWordToDB'))
      })
    } else {
      alert(i18n.t('errors.fillTheFields'));
    }
  };

  const addWordToDb = async () => {
    return new Promise<void>((resolve, reject) => {
      db.prepareAsync('INSERT INTO `words` (word, translation) VALUES ($word, $translation)')
        .then((statement) => {
          try {
            statement.executeAsync({$word: word, $translation: translation})
              .then(() => {
                resolve();
              })
              .catch((err2) => {
                alert(err2);
                reject();
              });
          } finally {
            statement.finalizeAsync();
          }
        })
        .catch(() => {
          reject();
        });
    });
  };
  const styles = StyleSheet.create({
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginHorizontal: 'auto',
      color: Colors[colorScheme ?? 'light'].text,
    },
    innerContainer: {
      gap: 10,
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 25,
    }
  })
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 100, backgroundColor: Colors[colorScheme ?? 'light'].background, }}>
      <View style={styles.innerContainer}>
        <ThemedInput onChangeText={(text) => setWord(text)} label={i18n.t('theWord')}></ThemedInput>
        <ThemedInput onChangeText={(text) => setTranslation(text)} label={i18n.t('theTranslation')}></ThemedInput>
        <View style={{ marginTop: 25 }}>
          <ThemedButton onPress={addWordClick} variant={ButtonVariants.Yellow} text={i18n.t('iLearned')}></ThemedButton>
        </View>
      </View>
      <View style={{ marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
        <Text>@ddgame</Text>
        <Text style={{ fontSize: 9}}>Remember icons created by Freepik - Flaticon</Text>
      </View>
    </SafeAreaView>
  );
}