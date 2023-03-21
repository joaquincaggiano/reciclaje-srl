import { ChangeEvent, useContext, useState } from "react";
import useUnsavedChanges from "./useUnsavedChanges";
import {useForm} from 'react-hook-form'
import { IProductSchema } from "@/interfaces/products";
import axios from "axios";
import router from "next/router";
import { UiContext } from "@/context";


export default function useHandleFiles (props: IProductSchema){
  const [stateUrl, setStateUrl] = useState<string>("");
    const {setValue, getValues} = useForm(({ defaultValues: props }))
    const [unsavedChanges, setUnsavedChanges, compareArrays] = useUnsavedChanges()
  const { toggleModalCancelChange } = useContext(UiContext);


const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No se han seleccionado archivos");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "productName",
        `product/${getValues("title").replaceAll(" ", "-").toLowerCase()}`
      );

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append(`images`, e.target.files[i]);
        const { data } = await axios.post("/api/admin/upload", formData);
        console.log("response", data);
        setValue("images", [...getValues("images"), data.url], {
          shouldValidate: true,
        });
        setUnsavedChanges(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUnsavedChanges = async () => {
    try {
      setUnsavedChanges(false);
      const productName = props.title.replaceAll(" ", "-").toLowerCase();

      const { data } = await axios.post("/api/admin/getFiles", {
        productName: productName,
      });

      const url = "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/";
      const imagesInDB = props.images.map((oneImage) => {
        return oneImage.replace(url, "");
      });

      const imagesInS3 = data.objects.filter(
        (img: string) => !imagesInDB.includes(img)
      );

      await imagesInS3.map((eachImage: string) => {
        axios.post("/api/admin/deleteImageFromS3", {
          key: eachImage,
        });
      });

      router.push(stateUrl || "/");

      toggleModalCancelChange();
    } catch (error) {
      console.log("ALGO SALIÓ MAL");
      throw new Error("No se pudieron borrar las imagenes");
    }
  };
  return [selectFile, deleteUnsavedChanges, setStateUrl, stateUrl]
}

