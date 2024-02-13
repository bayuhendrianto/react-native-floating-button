# REACT NATIVE FLOATING BUTTON

**A component Floating Button built with Reanimated v3+ and React Native Gesture handler V2+**

## Getting Started

To use the `FloatingButton` component, you first need to install the package via npm or yarn. Run either of the following commands:

```sh
npm install @bayudev/react-native-floating-button
```

```sh
yarn add @bayudev/react-native-floating-button
```

🚨 🚨 Please note that this library is built with React Native Reanimated v3 and uses React Native Gesture Handler. If you haven't installed Reanimated and Gesture Handler yet, please follow the installation instructions for [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/) and [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/).

## Usage

First, import the `FloatingButton` component from the `@bayudev/react-native-floating-button` library:

```javascript
import { FloatingButton } from '@bayudev/react-native-floating-button';
```

```javascript
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";

// import here
import {
  FloatingButton,
  FloatingButtonMethods,
} from "@bayudev/react-native-floating-button";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {

  // add ref to call methods [show or hide]
  const floatingButtonRef = useRef<FloatingButtonMethods>(null);

  useEffect(() => {
    setTimeout(() => {
      floatingButtonRef.current?.show();
    }, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <StatusBar style="auto" />
        
        <FloatingButton
          ref={floatingButtonRef}
          borderRadiusContent={50}
          heightContent={90}
          widthContent={90}
          maxLeft={10}
          maxRight={300}
          maxHeight={150}
          minHeight={80}
        >
          <View
            style={{
              width: 85,
              height: 85,
              borderRadius: 2,
              borderWidth: 1,
              borderColor: "#dedede",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  position: "absolute",
                  zIndex: 99,
                  top: -10,
                  right: 0,
                  borderWidth: 2,
                  borderColor: "blue",
                  borderRadius: 50,
                }}
                onPress={() => {
                  floatingButtonRef.current?.hide();

                  setTimeout(() => {
                    floatingButtonRef.current?.show();
                  }, 3000);
                }}
              >
                <Text>X</Text>
              </Pressable>
              <Image
                source={require("./assets/giftbox2.gif")}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </View>
          </View>
        </FloatingButton>
      </View>
    </GestureHandlerRootView>
  );
}


```

## Properties

| Property             | Type        | Default               | Required | Description                                                                          |
| -------------------- | ----------- | --------------------- | -------- | -------------------------------------------------------------------------------------|
| ref                  | String      | null                  | true     | using useRef for manage `BottomSheet` component for `show` or `hide`                 |
| widthContent         | Number      | `100`                 | true     | width of `FloatingButton`                                                            |
| heightContent        | Number      | `100`                 | true     | height of `FloatingButton`                                                           |
| borderRadiusContent  | Number      | `50`                  | false    | border radius of `FloatingButton`                                                    |
| maxLeft              | Number      | `10`                  | false    | maximum left content of `FloatingButton`                                             |
| maxRight             | Number      | `width screen - (width screen / 2.8)`  | false    | maximum right content of `FloatingButton`                           |
| minHeight            | Number      | `width screen / 2.8`  | false    | minimum height content of `FloatingButton`                                           |
| maxHeight            | Number      | `50`                  | false    | maximum height content of `FloatingButton`                                           |
| children             | ReactNode   | null or undefined     | true     | Put your any component here                                                          |

## Author

<table>
  <tr>
    <td align="center">
      <p></p>
      <a href="https://github.com/bayuhendrianto">
        <pre><img src="https://avatars.githubusercontent.com/u/40142196?v=4" width="96px" alt=""/><br/><br/>Bayu Hendrianto</pre>
      </a>
    </td>
  </tr>
</table>



## License

The library is licensed under the [MIT](./LICENSE) License.

<!--
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT -->
