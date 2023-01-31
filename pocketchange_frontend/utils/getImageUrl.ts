import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default async function getImageURL(entityType: string, entityID: string, fileName: string, setImageURL: any) {
  const storage = getStorage();
  await getDownloadURL(ref(storage, entityType.concat("/", entityID, "/", fileName))).then(
    function (url) {
      //console.log(url);
      setImageURL(url);
    },
    function (error) {
      console.log("ERROR: getDownloadURL: ", error);
    }
  );
}