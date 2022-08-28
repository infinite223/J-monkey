export async function playSoundPress(Audio) {
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/audio/press.mp3')
    );
    await sound.playAsync();
}