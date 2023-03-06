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
      return getImages(req, res);

    default:
      break;
  }
}

const getImages = (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al procesar los archivos subidos' });
      return;
    }

    // Procesar los archivos aquí...

    res.status(200).json({ message: 'Archivos subidos correctamente', files: files });
  });
};
