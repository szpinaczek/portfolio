import { useEffect } from "react";

/**
 * Component to render randomized text, with alien characters.
 * @param words The array of words to be rendered.
 * @returns The JSX for the randomized text component.
 */

const RandomizeText = ({ words }: { words: string[] }) => {
  const snap = useSnapshot(state);
  const codePoints: number[] = [
    0x1401, 0x1402, 0x1403, 0x1404, 0x1405, 0x1406, 0x1407, 0x1408, 0x1409,
    0x140a, 0x140b, 0x140c, 0x140d, 0x140e, 0x140f, 0x1450, 0x1451, 0x1452,
    0x1453, 0x1454, 0x1455, 0x1456, 0x1457, 0x1458, 0x1459, 0x142b, 0x142c,
    0x142d, 0x142e, 0x142f, 0x1410, 0x1441, 0x1442, 0x1443, 0x1444, 0x1445,
    0x1446, 0x1447, 0x1448,
  ];

  /**
   * Takes a string and returns a JSX element with two spans: one containing the original string,
   * and one containing a randomized sequence of alienChar characters based on the word length.
   * @param word The string to randomize.
   * @returns A JSX element with two spans, each containing a portion of the input string.
   */
  const getRandomizedAlienText = (word: string): JSX.Element => {
    const wordChars = [...word];
    const alienChars = codePoints.map((cp) => String.fromCodePoint(cp));

    shuffle(alienChars);
    alienChars.length = wordChars.length;

    const alienText = alienChars.map((char, i) => (
      <span className="alienChar" key={i}>
        {char}
      </span>
    ));

    return (
      <>
        <div
        className="humanText"
        dangerouslySetInnerHTML={{__html: wordChars.join("")}}
        />
        <div className="alienText">{alienText}</div>
      </>
    );
  };

  const shuffle = <T extends unknown>(arr: T[]): void => {
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  };

  useEffect(() => {
    const textElements = document.querySelectorAll<HTMLElement>(".alienChar");
    const textElementsArray: HTMLElement[] = [...textElements];

    const addClassWithDelay = (array: HTMLElement[], delay: number) => {
      shuffle(array);
      array.forEach((_, index) => {
        setTimeout(() => {
          array[index].classList.add("fade");
        }, index * delay);
      });
    };
    snap.isDesc && (addClassWithDelay(textElementsArray, 20))
  }, [snap.isDesc]);

  return (
    <div className="panel">
      {words.map((word, index) => (
        <div key={index}>{getRandomizedAlienText(word)}</div>
      ))}
    </div>
  );
};

export default RandomizeText;
