import { ChangeEvent, useState} from 'react'
import useUnsavedChanges from "./useUnsavedChanges";
import {useForm} from 'react-hook-form'
import { IProductSchema } from "@/interfaces/products";


export default function useChangeTitle (props: IProductSchema): [(color: any) => void, boolean | undefined]{
    const {setValue, getValues} = useForm(({ defaultValues: props }))
    const [unsavedChanges, setUnsavedChanges, compareArrays] = useUnsavedChanges()
    const [colorBoolean, setColorBoolean] = useState<boolean>()

const onChangeColor = (color: any) => {
    const currentColors = getValues("colors");
    if (currentColors.includes(color)) {
      setValue(
        "colors",
        currentColors.filter((c) => c !== color),
        { shouldValidate: true }
      );
      return compareArrays(props.colors, getValues("colors"));
    }
    setValue("colors", [...currentColors, color], { shouldValidate: true });

    compareArrays(props.colors, getValues("colors"));
    console.log("boolean", unsavedChanges)
    console.log("LOS COLORES", getValues("colors"));
    
    if(getValues("colors").includes(color)) {
      setColorBoolean(true) 
    } else {
      setColorBoolean(false) 
    }
  };
  
  

  return [onChangeColor, colorBoolean]
}

