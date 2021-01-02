import React from "react";
import { TextInput } from "react-native";
import "./styles.css";

const fingerLookup = {
  default: [-1, -1, -1, -1, -1],
  " ": [1, 0, 0, 0, 0],
  e: [0, 1, 0, 0, 0],
  t: [0, 0, 1, 0, 0],
  a: [0, 0, 0, 1, 0],
  o: [0, 0, 0, 0, 1],
  i: [1, 1, 0, 0, 0],
  r: [0, 1, 1, 0, 0],
  c: [0, 0, 1, 1, 0],
  m: [0, 0, 0, 1, 1],
  n: [1, 0, 1, 0, 0],
  d: [0, 1, 0, 1, 0],
  u: [0, 0, 1, 0, 1],
  s: [1, 0, 0, 1, 0],
  l: [0, 1, 0, 0, 1],
  h: [1, 0, 0, 0, 1],
  y: [1, 1, 0, 1, 1],
  k: [0, 1, 1, 1, 1],
  j: [1, 0, 1, 1, 1],
  x: [1, 0, 1, 0, 1],
  z: [1, 1, 1, 0, 1],
  v: [1, 1, 1, 1, 0],
  g: [1, 0, 1, 1, 0],
  q: [0, 1, 0, 1, 1],
  w: [1, 1, 0, 1, 0],
  p: [1, 0, 0, 1, 1],
  f: [1, 1, 0, 0, 1],
  b: [0, 1, 1, 1, 0],
  "!": [0, 2, 0, 2, 0],
  "?": [0, 2, 0, 0, 2],
  ".": [2, 0, 0, 0, 0],
  ",": [0, 0, 0, 0, 2],
  // i: [0, 0, 0, 0, 0]
  // -
  // Change comma since it is double 'o'
  // 'u' is hard, switch with 'v'
};

export default function App() {
  const [targetText, setTargetText] = React.useState("Big black bugs bled black blood.");
  const [typedText, setTypedText] = React.useState("");
  const [textIndex, setTextIndex] = React.useState(0);

  function getColor(key, index) {
    if (!(key in fingerLookup)) {
      key = "default";
    }

    if (fingerLookup[key][index] === -1) {
      return "grey";
    } else if (fingerLookup[key][index] === 0) {
      return "black";
    } else if (fingerLookup[key][index] === 1) {
      return "blue";
    } else if (fingerLookup[key][index] === 2) {
      return "green";
    }
  }

  function getDisplayText() {
    var startText = targetText.substr(0, textIndex);
    var redChar = targetText.charAt(textIndex);
    var endText = targetText.substr(textIndex + 1);

    // TODO only keep one word on each side of the target text

    if (redChar === " ") {
      redChar = "_";
    }

    return (
      <div>
        {startText}
        <span style={{ color: "blue", fontWeight: "bold" }}>{redChar}</span>
        {endText}
      </div>
    );
  }

  function typedInputEvent(text) {
    var redChar = targetText.charAt(textIndex);
    var currentChar = text.charAt(text.length - 1);

    setTypedText(currentChar);

    if (redChar === currentChar) {
      setTextIndex(textIndex + 1);
    }
  }

  function resetButton() {
    setTextIndex(0);
    setTypedText("");
  }

  return (
    <div className="App">
      <h1>Learn to Tap</h1>
      <h3>With the Tap Strap 2</h3>
      <p>Enter text for training</p>
      <p>
        <TextInput
          style={{
            backgroundColor: "lightgrey",
            borderColor: "#111111",
            borderWidth: 1,
            width: "80%",
            maxWidth: 512
          }}
          onChangeText={(text) => setTargetText(text)}
          value={targetText}
          multiline
          numberOfLines={4}
        />
      </p>

      <p>
        <svg xmlns="http://www.w3.org/2000/svg" height="200">
          <circle
            cx="70"
            cy="180"
            r="20"
            fill={getColor(targetText.charAt(textIndex).toLowerCase(), 0)}
          />
          <circle
            cx="100"
            cy="70"
            r="20"
            fill={getColor(targetText.charAt(textIndex).toLowerCase(), 1)}
          />
          <circle
            cx="150"
            cy="40"
            r="20"
            fill={getColor(targetText.charAt(textIndex).toLowerCase(), 2)}
          />
          <circle
            cx="200"
            cy="50"
            r="20"
            fill={getColor(targetText.charAt(textIndex).toLowerCase(), 3)}
          />
          <circle
            cx="250"
            cy="90"
            r="20"
            fill={getColor(targetText.charAt(textIndex).toLowerCase(), 4)}
          />
        </svg>
      </p>
      <br />
      <p style={{ fontSize: "25pt" }}>{getDisplayText()}</p>
      <p>
        <TextInput
          style={{
            backgroundColor: "lightgrey",
            borderColor: "#111111",
            borderWidth: 1,
            width: 40,
            fontSize: "40px",
            textAlign: "center"
          }}
          onChangeText={(text) => typedInputEvent(text)}
          value={typedText}
        />
      </p>
      <p style={{fontSize: "12px"}}>Click here and start typing.</p>
      <p>
        <button style={{ fontSize: "18px" }} onClick={() => resetButton()}>
          Reset
        </button>
      </p>
    </div>
  );
}
