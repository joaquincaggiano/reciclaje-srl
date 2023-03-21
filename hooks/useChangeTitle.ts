import { ChangeEvent } from "react";
import useUnsavedChanges from "./useUnsavedChanges";
import {useForm} from 'react-hook-form'
import { IProductSchema } from "@/interfaces/products";
import { IServiceSchema } from "@/interfaces/services";
import { IBlogSchema } from "@/interfaces/blogs";


export default function useChangeTitle (props: IProductSchema | IServiceSchema | IBlogSchema){
    const {setValue, getValues} = useForm(({ defaultValues: props }))
    const [unsavedChanges, setUnsavedChanges] = useUnsavedChanges()

    const handleTitleChange = function (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) {
        setValue("title", e.target.value, { shouldValidate: true });
        console.log("getvalues en hook", getValues("title"))
        if (props.title === getValues("title")) {
                setUnsavedChanges(false);
              } else {
                setUnsavedChanges(true);
              }
      };
      return handleTitleChange
}