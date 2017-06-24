export function computeCanvasDimensions(height, width, videoHeight, videoWidth) {
  /*
   * Canvas dimensions need to be computed based on the constraints given as
   * props (e.g. if one or both of height, width are passed) and the
   * dimensions of the video being played (i.e. the videoHeight and videoWidth
   * of the actual media). If both are given, choose keep the aspect ratio
   * without exceeding the given values.
   */

  let canvasHeight = Number(height) || 0;
  let canvasWidth = Number(width) || 0;
  const aspect = videoWidth / videoHeight || 0;

  if (!aspect) {
    return { canvasHeight, canvasWidth };
  }

  // neither given
  if (canvasHeight === 0 && canvasWidth === 0) {
    canvasHeight = videoHeight;
    canvasWidth = videoWidth;
  }
  // only height given
  else if (canvasHeight !== 0 && canvasWidth === 0) {
    canvasWidth = aspect * canvasHeight;
  }
  // only width given
  else if (canvasWidth !== 0 && canvasHeight === 0) {
    canvasHeight = canvasWidth / aspect;
  }
  // both given
  else {
    const possibleHeight = canvasWidth / aspect;
    const possibleWidth = aspect * canvasHeight;

    if (possibleHeight < canvasHeight) {
      canvasHeight = possibleHeight;
    }
    else {
      canvasWidth = possibleWidth;
    }
  }

  return { canvasHeight, canvasWidth };
}
