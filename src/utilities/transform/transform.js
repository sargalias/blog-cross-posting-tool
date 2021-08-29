import exactReplace from '../exactReplace/exactReplace.js';
import replaceRootRelativeUrls from '../replaceRootRelativeLinks/replaceRootRelativeLinks.js';

const transform = (content, transformMap) => {
  const replaceMap = transformMap.exactReplace;
  if (replaceMap) {
    content = exactReplace(content, replaceMap);
  }
  const rootRelativeUrlsPrefix = transformMap.rootRelativeUrlsPrefix;
  if (rootRelativeUrlsPrefix) {
    content = replaceRootRelativeUrls(content, rootRelativeUrlsPrefix);
  }
  return content;
};

export default transform;
