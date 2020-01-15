const DESCRIPTION = {
  editor: 'Rich Content Editor',
  navigation: 'Navigation Menu',
  assignment: 'Assignments (Submission Type: External)',
  quizzes: 'Quizzes',
};

/**
 * Given an app's list of placments, create a human-readable description of
 *   where the app will show up
 * @param {string[]} placements - list of placements
 * @return {string} description of placements
 */
export default (placement) => {
  if (placement.length === 1) {
    return DESCRIPTION[placement[0]];
  }
  if (placement.length === 2) {
    return `${DESCRIPTION[placement[0]]} and ${DESCRIPTION[placement[1]]}`;
  }
  return (
    placement
      .map((p, i) => {
        return `${DESCRIPTION[p]},${i === placement.length - 2 ? ' and' : ''}`;
      })
      .join(' ')
  );
};
