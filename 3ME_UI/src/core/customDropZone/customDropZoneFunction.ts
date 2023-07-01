export const customDocumentUploadError = (errorType: string) => {
  let errorToDisplay: string | null = "Something went wrong";
  switch (errorType) {
    case "file-invalid-type":
      errorToDisplay = "Incompatible file type";
      break;
    case "file-too-large":
      errorToDisplay = "File size exceeded 10 MB";
      break;
    case "duplicate-file":
      errorToDisplay = "File Already Exists";
      break;
    case "too-many-files":
      errorToDisplay = "Too many files";
      break;
    case "empty-file":
      errorToDisplay = "File Has No Content";
      break;
    case "invalid-doc-type":
      errorToDisplay = "Invalid Doc Type";
      break;
    default:
      errorToDisplay = null;
      break;
  }
  return errorToDisplay;
};

export const getBase64 = async (file: any) => {
  return new Promise((resolve) => {
    let base64Data;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result?.toString();
      base64Data = data?.split(";")[1].split(",")[1];
      resolve(base64Data);
    };
  }).catch((error: any) => {
    return "base64ConversionFailed";
  });
};
