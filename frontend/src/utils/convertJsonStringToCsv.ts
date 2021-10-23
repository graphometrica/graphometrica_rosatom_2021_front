
export const convertJsonStringToCsv = (csvString: string) => {

  if (!csvString) return '';
  try {
    return JSON.parse(csvString).map((x) => x.join(",")).join("\n")
  } catch (ex) {

  }
  return '';

}