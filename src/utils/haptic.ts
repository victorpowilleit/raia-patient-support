export function feedback(){
if('vibrate' in navigator) {
    // A API Navigator.vibrate() está disponível, então podemos acionar o feedback tátil
    navigator.vibrate(100); // 100ms de vibração
  }
}