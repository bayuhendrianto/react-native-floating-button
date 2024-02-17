import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { FloatingButtonMethods, FloatingButtonProps } from "./types";

const { width, height } = Dimensions.get("screen");
export const FloatingButton = forwardRef<
  FloatingButtonMethods,
  FloatingButtonProps
>(
  (
    {
      widthContent = 100,
      heightContent = 100,
      borderRadiusContent = 50,
      minHeight = 10,
      maxHeight = width / 2.8,
      maxLeft = 10,
      maxRight = width - width / 4.5,
      currentPosition = "LEFT",
      children,
    }: FloatingButtonProps,
    ref
  ) => {
    const styles = StyleSheet.create({
      container: {
        zIndex: 9999,
        position: "absolute",
        height: heightContent,
        width: widthContent,
        borderRadius: borderRadiusContent,
        backgroundColor: "transparent",
      },
    });
    const MAX_LEFT = maxLeft,
      MAX_RIGHT = maxRight,
      MIN_HEIGHT = minHeight,
      MAX_HEIGHT = height - maxHeight;

    const contentColor = useSharedValue(styles.container.backgroundColor);

    const contentPosition = useSharedValue({
      horizontal: currentPosition === "RIGHT" ? MAX_RIGHT : MAX_LEFT,
      vertical: MAX_HEIGHT - width / 2,
    });
    const contextHorizontal = useSharedValue(0);
    const contextVertical = useSharedValue(0);

    const [showButton, setShowButton] = useState(false);

    const floatingAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        { translateX: contentPosition.value.horizontal },
        { translateY: contentPosition.value.vertical },
      ],
      backgroundColor: contentColor.value,
    }));

    const current = useSharedValue(0);

    const floatingGesture = Gesture.Pan()
      .onStart((e) => {
        contentColor.value = "#FFFFFF";
        contextHorizontal.value = current.value;
        contextVertical.value = contentPosition.value.vertical;
      })
      .onUpdate((e) => {
        contentPosition.value = {
          horizontal: contextHorizontal.value + e.translationX,
          vertical: contextVertical.value + e.translationY,
        };

        if (contentPosition.value.vertical > height / 2) {
          contentPosition.value = {
            horizontal: Math.max(contentPosition.value.horizontal, MAX_LEFT),
            vertical: Math.min(contentPosition.value.vertical, MAX_HEIGHT),
          };
        } else {
          contentPosition.value = {
            horizontal: Math.max(contentPosition.value.horizontal, MAX_LEFT),
            vertical: Math.max(contentPosition.value.vertical, MIN_HEIGHT),
          };
        }
        if (contentPosition.value.horizontal >= width / 2) {
          contentPosition.value = {
            ...contentPosition.value,
            horizontal: Math.min(contentPosition.value.horizontal, MAX_RIGHT),
          };
        } else {
          contentPosition.value = {
            ...contentPosition.value,
            horizontal: Math.max(contentPosition.value.horizontal, MAX_LEFT),
          };
        }
      })
      .onEnd((e) => {
        if (contentPosition.value.horizontal > width / 2) {
          contentPosition.value.horizontal = Math.max(
            contentPosition.value.horizontal,
            MAX_LEFT
          );
          contentPosition.value.horizontal = withSpring(MAX_RIGHT, {
            damping: 50,
          });

          current.value = MAX_RIGHT;
        } else {
          contentPosition.value.horizontal = Math.max(
            contentPosition.value.horizontal,
            MAX_LEFT
          );
          contentPosition.value.horizontal = withSpring(MAX_LEFT, {
            damping: 50,
          });

          current.value = MAX_LEFT;
        }
      })
      .onFinalize((e) => {
        contentColor.value = styles.container.backgroundColor;
      });

    const show = useCallback(() => {
      "worklet";
      setShowButton(true);
    }, [showButton]);

    const hide = useCallback(() => {
      "worklet";
      setShowButton(false);
    }, [showButton]);

    useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

    return (
      <GestureDetector gesture={floatingGesture}>
        <Animated.View style={[styles.container, floatingAnimatedStyle]}>
          {showButton && children}
        </Animated.View>
      </GestureDetector>
    );
  }
);
