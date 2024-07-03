const bboxToBounds = (bbox: Array<number>): Array<Array<number>> => {
  return [
    [bbox[1], bbox[0]],
    [bbox[3], bbox[2]]
  ];
};

export default bboxToBounds;
