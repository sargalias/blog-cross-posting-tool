import { construct } from 'ramda';

const exactReplace = (content, replaceMap) => {
  const exactReplaceSingle = (string, [replacee, replacement]) => {
    const regexReplacee = constructRegex(replacee, 'g');
    return string.replace(regexReplacee, replacement);
  };

  const replaceMapEntries = Object.entries(replaceMap);
  const result = replaceMapEntries.reduce(exactReplaceSingle, content);
  return result;
};

const constructRegex = construct(RegExp);

export default exactReplace;
