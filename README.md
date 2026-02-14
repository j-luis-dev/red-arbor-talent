# Red Arbor Talent

App de empleos remotos que consume la API pública de [Remotive](https://remotive.com/). Construida con Expo, React Native, Zustand y TypeScript.

## Cómo ejecutar la aplicación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el proyecto:

   ```bash
   npx expo start
   ```

3. Abre la app en:
   - **iOS:** Simulador o dispositivo (Expo Go o development build)
   - **Android:** Emulador o dispositivo (Expo Go o development build)
   - **Web:** Navegador (salida estática)

En la salida del comando verás opciones para abrir en el simulador, en Expo Go o en un build de desarrollo.

## Qué se evaluó / Stack

- **Expo 54** con expo-router para navegación basada en archivos
- **Zustand** para estado global (lista de empleos, filtros, favoritos con persistencia en AsyncStorage)
- **Estados asíncronos** con caché offline: se muestra la última lista guardada y se revalida en segundo plano; manejo de errores y reintentos
- **Arquitectura:** servicios (Remotive API), stores (jobs, favoritos), componentes reutilizables y pantallas por pestañas + detalle
- **TypeScript** en todo el proyecto
- **Accesibilidad:** etiquetas y hints en botones y tarjetas
- **Tema claro/oscuro** y componentes con React Native Paper

## Atribución

Los datos de empleos provienen de la [API de Remotive](https://remotive.com/api/remote-jobs). Remotive no está afiliado a este proyecto; se utilizan sus endpoints públicos según sus términos de uso.
