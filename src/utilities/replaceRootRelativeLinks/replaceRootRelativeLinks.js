const replaceRootRelativeLinks = (content, root) => {
  const regex = /\[(\/[^\]]*)\]/g;
  return content.replace(regex, `[${root}$1]`);
};

export default replaceRootRelativeLinks;
