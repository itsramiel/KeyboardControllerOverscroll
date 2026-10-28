import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Pressable,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';

type Mode = 'insets' | 'layout';
type Content = 'short' | 'long';

// The short form fits the scroll view without the keyboard and overflows it with the keyboard.
// The long form overflows the scroll view even without the keyboard.
const FIELD_COUNT: Record<Content, number> = { short: 5, long: 12 };

export default function App() {
  const [mode, setMode] = useState<Mode>('insets');
  const [content, setContent] = useState<Content>('short');

  return (
    <KeyboardProvider>
      <View style={styles.container}>
        <View style={styles.controls}>
          <Toggle label="Mode" options={['insets', 'layout']} value={mode} onChange={setMode} />
          <Toggle label="Content" options={['short', 'long']} value={content} onChange={setContent} />
        </View>
        {/* The key remounts the scroll view so that each setup starts from scroll position 0. */}
        <KeyboardAwareScrollView
          key={`${mode}-${content}`}
          mode={mode}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Sign up</Text>
          {Array.from({ length: FIELD_COUNT[content] }, (_, i) => (
            <View key={i} style={styles.field}>
              <Text style={styles.label}>Field {i + 1}</Text>
              <TextInput placeholder={`Field ${i + 1}`} style={styles.input} />
            </View>
          ))}
          <View style={styles.button}>
            <Text style={styles.buttonText}>NEXT</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <StatusBar style="auto" />
    </KeyboardProvider>
  );
}

type ToggleProps<T extends string> = {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

function Toggle<T extends string>({ label, options, value, onChange }: ToggleProps<T>) {
  return (
    <View style={styles.toggle}>
      <Text style={styles.toggleLabel}>{label}</Text>
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          style={[styles.option, option === value && styles.optionSelected]}
        >
          <Text style={option === value && styles.optionTextSelected}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: RNStatusBar.currentHeight,
  },
  controls: {
    gap: 8,
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    width: 64,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  optionSelected: {
    backgroundColor: '#222',
    borderColor: '#222',
  },
  optionTextSelected: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
  },
  button: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222',
    borderRadius: 4,
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
