// this handleChange handles the images and the files data...
import { loadingComplete, loadingStart } from "../Redux/loadingSlice";
export const handleChangeForImages = (
  e,
  setRawFiles,
  setSelectedFiles,
  rawFiles,
  selectedFiles,
  dispatch
) => {
  const { name } = e.target;
  // setting the rawFiles in the state for media url...
  setRawFiles({ ...rawFiles, [name]: e.target.files[0] });
  // for the image preveiw ...
  const fileReader = new FileReader();
  if (e.target.files[0]) {
    fileReader.readAsDataURL(e.target.files[0]);
    dispatch(
      loadingStart({
        message: {
          currentMessage: "processing the image data",
          forWhichPorpose: name,
        },
      })
    );
  }
  fileReader.onload = (reader) => {
    setSelectedFiles({ ...selectedFiles, [name]: reader.target.result });

    setTimeout(() => {
      // used this because,for show the loading state...
      // it gives more interactive feel to the user...
      dispatch(loadingComplete());
    }, 2000);
  };
};
