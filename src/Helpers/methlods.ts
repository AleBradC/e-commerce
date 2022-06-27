export const capitalizeEachWord = (content: string) => {
  return content.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
