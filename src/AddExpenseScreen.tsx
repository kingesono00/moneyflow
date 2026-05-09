import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type QuickAmount = 5 | 10 | 20 | 50;

const QUICK_AMOUNTS: QuickAmount[] = [5, 10, 20, 50];

/**
 * 3-tap Add Expense UX:
 * 1) tap amount chip (or type custom amount)
 * 2) tap category chip
 * 3) tap Save
 */
export default function AddExpenseScreen() {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Food');
  const [note, setNote] = useState<string>('');

  const canSave = useMemo(() => Number(amount) > 0 && !!category, [amount, category]);

  const selectAmount = (value: QuickAmount) => setAmount(String(value));

  const saveExpense = () => {
    if (!canSave) return;
    // Replace with API/store integration.
    console.log('expense_saved', {
      amount: Number(amount),
      category,
      note,
      createdAt: new Date().toISOString(),
    });
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <Text style={styles.subtitle}>Save in 3 taps: Amount → Category → Save</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.row}>
          {QUICK_AMOUNTS.map((chip) => (
            <Pressable
              key={chip}
              onPress={() => selectAmount(chip)}
              style={[styles.chip, amount === String(chip) && styles.chipActive]}
            >
              <Text style={[styles.chipText, amount === String(chip) && styles.chipTextActive]}>
                ${chip}
              </Text>
            </Pressable>
          ))}
        </View>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="Or enter custom amount"
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.row}>
          {['Food', 'Transport', 'Shopping', 'Bills'].map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[styles.chip, category === item && styles.chipActive]}
            >
              <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note"
          style={styles.input}
        />
      </View>

      <Pressable onPress={saveExpense} disabled={!canSave} style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}>
        <Text style={styles.saveText}>Save Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 16, paddingTop: 24 },
  title: { fontSize: 28, fontWeight: '700', color: '#111827' },
  subtitle: { marginTop: 6, color: '#6B7280' },
  section: { marginTop: 18 },
  label: { marginBottom: 8, fontWeight: '600', color: '#374151' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: { borderColor: '#2563EB', backgroundColor: '#DBEAFE' },
  chipText: { color: '#374151', fontWeight: '500' },
  chipTextActive: { color: '#1D4ED8' },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  saveBtn: {
    marginTop: 'auto',
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 14,
  },
  saveBtnDisabled: { opacity: 0.45 },
  saveText: { color: 'white', fontWeight: '700' },
});
