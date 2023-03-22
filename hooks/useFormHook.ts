import {
	ChangeEvent,
	useContext,
	useEffect,
	useState,
  useRef
} from 'react';
import { useForm } from 'react-hook-form';
import { IProductSchema } from '@/interfaces/products';
import { IServiceSchema } from '@/interfaces/services';
import { IBlogSchema } from '@/interfaces/blogs';
import useUnsavedChanges from './useUnsavedChanges';
import axios from 'axios';
import router from 'next/router';
import { UiContext } from '@/context/ui/UiContext';

export default function useFormHook(
	props:
		| IProductSchema
		| IServiceSchema
		| IBlogSchema
) {
	const [isSaving, setIsSaving] = useState<boolean>(false);
  const [stateUrl, setStateUrl] = useState<string>("")

	const [
		unsavedChanges,
		setUnsavedChanges,
		compareArrays,
	] = useUnsavedChanges();

	const { toggleModalCancelChange } =
		useContext(UiContext);

	interface FormData {
		_id?: string;
		title: string;
		images: string[];
		colors: string[];
		category: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		setValue,
	} = useForm<FormData>({ defaultValues: props });

  useEffect(() => {
    const message = "no te vayas please";

    const routeChangeStart = (url: string) => {
      //@ts-ignore
      setStateUrl(url);
      if (router.asPath !== url && unsavedChanges) {
        toggleModalCancelChange();
        throw "Abort route change. Please ignore this error.";
      }
    };

    const beforeunload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        toggleModalCancelChange();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", beforeunload);
    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [unsavedChanges]);

	// funcion del titulo
	const handleTitleChange = function (
		e: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>
	) {
		setValue('title', e.target.value, {
			shouldValidate: true,
		});
		// console.log("getvalues en hook", getValues("title"))
		if (props.title === getValues('title')) {
			setUnsavedChanges(false);
		} else {
			setUnsavedChanges(true);
		}
	};

	// funcion del cambio de colores
	const onChangeColor = (color: string) => {
		const currentColors = getValues('colors');
		if (currentColors.includes(color)) {
			setValue(
				'colors',
				currentColors.filter((c) => c !== color),
				{ shouldValidate: true }
			);
			//@ts-ignore
			return compareArrays(props.colors,getValues('colors'));
		}
		setValue(
			'colors',
			[...currentColors, color],
			{ shouldValidate: true }
		);
		//@ts-ignore
		compareArrays(props.colors,getValues('colors'));
		console.log('boolean', unsavedChanges);
		console.log(
			'LOS COLORES',
			getValues('colors')
		);
	};

	// función de la categoria

	// funcion de las imagenes
	const selectFile = async (
		e: ChangeEvent<HTMLInputElement>
	) => {
		if (
			!e.target.files ||
			e.target.files.length === 0
		) {
			console.error(
				'No se han seleccionado archivos'
			);
			return;
		}

		try {
			const formData = new FormData();

			formData.append(
				'productName',
				`product/${getValues('title')
					.replaceAll(' ', '-')
					.toLowerCase()}`
			);

			for (
				let i = 0;
				i < e.target.files.length;
				i++
			) {
				formData.append(
					`images`,
					e.target.files[i]
				);
				const { data } = await axios.post(
					'/api/admin/upload',
					formData
				);
				console.log('response', data);
				setValue(
					'images',
					[...getValues('images'), data.url],
					{
						shouldValidate: true,
					}
				);
				setUnsavedChanges(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUnsavedChanges = async (
		stateUrl: string
	) => {
		try {
      console.log("el state url en el hook", stateUrl)
			setUnsavedChanges(false);
			const productName = props.title
				.replaceAll(' ', '-')
				.toLowerCase();

			const { data } = await axios.post(
				'/api/admin/getFiles',
				{
					productName: productName,
				}
			);

			const url =
				'https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/';
			const imagesInDB = props.images.map(
				(oneImage) => {
					return oneImage.replace(url, '');
				}
			);

			const imagesInS3 = data.objects.filter(
				(img: string) => !imagesInDB.includes(img)
			);

			await imagesInS3.map(
				(eachImage: string) => {
					axios.post(
						'/api/admin/deleteImageFromS3',
						{
							key: eachImage,
						}
					);
				}
			);

			router.push(stateUrl || '/');

			toggleModalCancelChange();
		} catch (error) {
			console.log('ALGO SALIÓ MAL');
			throw new Error(
				'No se pudieron borrar las imagenes'
			);
		}
	};

  const onDeleteImage = async (image: string) => {
    console.log("DELETED IMAGE", image);
    const imageName = image.replace(
      "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/",
      ""
    );
    await axios.post("/api/admin/deleteImageFromS3", {
      key: imageName,
    });
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );

    compareArrays(props.images, getValues("images"));
    
  };
// const submitFunction = function (form: FormData){
	handleSubmit(async (form: FormData) => {
		if (form.images.length < 1) return;
		setIsSaving(true);
		try {
			setUnsavedChanges(false);
			const { data } = await axios({
				url: '/api/admin/products',
				method: form._id ? 'PUT' : 'POST',
				data: form,
			});
			router.replace('/admin/products');
			if (!form._id) {
				router.replace(
					`/admin/products/${form.title}`
				);
			} else {
				setIsSaving(false);
			}
		} catch (error) {
			console.log(error);
			setIsSaving(false);
		}
	});

// }

	return [
		handleSubmit,
		register,
    errors,
		setValue,
		getValues,
    unsavedChanges,
    setUnsavedChanges,
    handleTitleChange,
    isSaving,
    deleteUnsavedChanges,
    onChangeColor,
    onDeleteImage,
    selectFile,
    stateUrl,
	];
}
