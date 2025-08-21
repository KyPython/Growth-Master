const saveEntry = async () => {
  if (isSaving) return; // Prevent multiple saves
  setIsSaving(true);

  try {
    InteractionManager.runAfterInteractions(async () => {
      const existingData = await AsyncStorage.getItem(GROWTH_ENTRIES_KEY);
      const entries = existingData ? JSON.parse(existingData) : [];

      const newEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        score,
        note,
      };

      const updatedEntries = [...entries, newEntry];
      await AsyncStorage.setItem(GROWTH_ENTRIES_KEY, JSON.stringify(updatedEntries));

      console.log('Entry saved successfully:', newEntry); // Debugging log
      setShowSuccess(true); // Set showSuccess to true instead of navigating immediately
    });
  } catch (error) {
    console.error('Error saving entry:', error);
    Alert.alert('Error', 'Failed to save your entry. Please try again.');
    setIsSaving(false);
  }
};

const handleSuccessAnimationFinish = () => {
  setShowSuccess(false);
  setScore(5); // Reset score
  setNote(''); // Reset note
  setIsSaving(false);
  router.push('/'); // or navigation.navigate('Home')

  Alert.alert(
    'Entry Saved!',
    'Your mood entry has been successfully recorded.',
    [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'), // Navigate to home after confirmation
      },
    ]
  );
};

return (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Entry</Text>
      </View>

      <View style={styles.moodSection}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <Text style={[styles.moodText, { color: getMoodColor(score) }]}>
          {getMoodText(score)}
        </Text>
        <View style={styles.moodSlider}>
          <Text style={styles.moodLabel}>1</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={score}
            onValueChange={(value) => setScore(value)}
            minimumTrackTintColor={getMoodColor(score)}
            thumbTintColor={getMoodColor(score)}
          />
          <Text style={styles.moodLabel}>10</Text>
        </View>
      </View>

      <View style={styles.noteSection}>
        <Text style={styles.sectionTitle}>Add a note (optional):</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Write your thoughts here..."
          placeholderTextColor="#888"
          value={note}
          onChangeText={(text) => setNote(text)}
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveEntry}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save Entry'}
        </Text>
      </TouchableOpacity>

      {showSuccessAnimation && (
        <SuccessAnimation onAnimationFinish={handleSuccessAnimationFinish} />
      )}
      {showSuccess && (
  <View style={{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  }}>
    <SuccessAnimation onAnimationFinish={handleSuccessAnimationFinish} />
  </View>
)}
    </ScrollView>
  </SafeAreaView>
);




