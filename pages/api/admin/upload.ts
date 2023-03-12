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

const getImagesPath = async (
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al procesar los archivos subidos" });
      return;
    }

    const imagesPath: string[] = [];
    const productName = fields.productName;
    
    for (const key in files) {
      imagesPath.push(`product/${productName}/${files[key].newFilename}`);
    }

    res.status(200).json({
      message: "Archivos subidos correctamente",
      files,
      fields,
      imagesPath,
    });
  });
};
