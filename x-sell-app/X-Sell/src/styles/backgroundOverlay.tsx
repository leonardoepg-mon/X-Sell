// components/BackgroundOverlay.tsx

import { StyleSheet, View } from "react-native";

import Svg, { G, Path } from "react-native-svg";

type Props = {
  width?: number | string;
  height?: number | string;
  opacity?: number;
};

function FractalsPattern({
  width = "100%",
  height = "100%",
  opacity = 1,
}: Props) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 709 845"
      fill="none"
      opacity={opacity}
    >
      <G
        stroke="#42C2C2"
        strokeWidth={1.75}
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        
    <Path
       d="M0 233.5H211L176 294.5H35L0 233.5Z"
       id="Path1"
        />
    <Path
       d="M37 172L107 51H388L318 172L248 293L177 172L141 112.5L177 51L248 -71"
       id="Path2"
        />
    <Path
       d="M72 233.5L141 113H423L353 233.5L318 294H247"
       id="Path3"
        />
    <Path
       d="M141 113L212 233.5L282 355H456L421 294H247"
       id="Path4"
        />
    <Path
       d="M177 51L247 -70L318 51"
       id="Path5"
        />
    <Path
       d="M352 -10L423 111H632L562 232L492 355L421 232L386 172L422 111L492 -10"
       id="Path6"
        />
    <Path
       d="M422 111L352 -10"
       id="Path7"
        />
    <Path
       d="M422 111L492 111L562 -10"
       id="Path8"
        />
    <Path
       d="M492 111L422 -10"
       id="Path9"
        />
    <Path
       d="M632 111L703 232L773 354"
       id="Path10"
        />
    <Path
       d="M632 -10L703 111L668 172H386"
       id="Path11"
        />
    <Path
       d="M668 172L598 293L562 355H703L668 294L633 233H738"
       id="Path12"
        />
    <Path
       d="M703 111L738 51L703 -10"
       id="Path13"
        />
    <Path
       d="M633 233H703L738 294"
       id="Path14"
        />
    <Path
       d="M456 294L526 415L456 536H386L351 476L421 355H703L668 415H456"
       id="Path15"
        />
    <Path
       d="M386 172L456 294L526 415"
       id="Path16"
        />
    <Path
       d="M492 355L562 476L632 597"
       id="Path17"
        />
    <Path
       d="M562 355L632 233"
       id="Path18"
        />
    <Path
       d="M703 355L773 476"
       id="Path19"
        />
    <Path
       d="M456 415H738L668 536L633 597H561L491 476L456 415Z"
       id="Path20"
        />
    <Path
       d="M526 415L596 536L632 597"
       id="Path21"
        />
    <Path
       d="M738 415L808 536"
       id="Path22"
        />
    <Path
       d="M386 536H526L491 597H349L315 538L386 538L351 477"
       id="Path23"
        />
    <Path
       d="M526 536L596 657H738V597H632"
       id="Path24"
        />
    <Path
       d="M561 597L491 718L456 782L421 721L491 599"
       id="Path25"
        />
    <Path
       d="M526 663H738L668 782L632 844L562 723L526 663Z"
       id="Path26"
        />
    <Path
       d="M526 663L596 784L666 903"
       id="Path27"
        />
    <Path
       d="M596 663H738"
       id="Path28"
        />
    <Path
       d="M456 783H596L561 844H420L385 784L456 784Z"
       id="Path29"
        />
    <Path
       d="M596 784L631 844L666 783L596 663"
       id="Path30"
        />
    <Path
       d="M738 663L808 784"
       id="Path31"
        />
      </G>
    </Svg>
  );
}

export function BackgroundOverlay() {
  return (
    <View
      style={StyleSheet.absoluteFill}
    >
      <FractalsPattern
        width="100%"
        height="100%"
        opacity={0.3}
      />
    </View>
  );
}