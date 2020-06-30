export interface Hits {
  name: string;
  ObjectId: string;
  _highlightResult: {
    name: {
      value: string;
      matchLevel: string;
      fullyHightLighted: boolean;
      matchedWords: string[];
    };
  };
}

export interface Props {
  setHideTitle: (s: boolean) => void;
}
