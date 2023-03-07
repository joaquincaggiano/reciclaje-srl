import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

type NextApiRequestWithFormData = NextApiRequest & {
  formData?: formidable.Fields;
  files?: formidable.Files;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return getImagesPath(req, res);

    default:
      break;
  }
}
const paths = (files: formidable.Files, fields: formidable.Fields)=>{
  const imagesPath: string[] = []
  const productName = fields.productName
  for (const key in files){
     imagesPath.push(`product/${productName}/${files[key].newFilename}`)
  }
  return imagesPath
}
const getImagesPath = async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {    
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al procesar los archivos subidos' });
      return;
    }
    //todo: generar el path por cada image/ un array con cada url correcta - la respuesta que devuelve hay que agregarla con await en s3upload
    // buscar como subir multiple files a s3 en chatgpt
    const imagesPath = paths(files, fields)
    res.status(200).json({ message: 'Archivos subidos correctamente', files: files, fields, imagesPath });
  });
};
