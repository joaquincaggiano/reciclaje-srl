import { ChangeEvent} from 'react'
import useUnsavedChanges from "./useUnsavedChanges";
import {useForm} from 'react-hook-form'
import { IProductSchema } from "@/interfaces/products";


export default function useChangeTitle (props: IProductSchema): (color: any) => void{
    const {setValue, getValues} = useForm(({ defaultValues: props }))
    const [unsavedChanges, setUnsavedChanges, compareArrays] = useUnsavedChanges()

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
  };
  return onChangeColor
}