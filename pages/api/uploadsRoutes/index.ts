import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  url: string
}
| {url: string[]}
| {message: string}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "POST":
            return postPath(req, res)
        // case "GET":
        //     return getPath(req, res)
    
        default:
            res.status(400).json({ message: 'Bad request' })
    }
}

// const getPath = (req: NextApiRequest, res: NextApiResponse<Data>) => {
//     // const {path, filename} = req.body;
    
//     // const url = 
    
//     // return res.status(200).json()
// }

const postPath = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // let url: string[] = [];
    const {path, filename} = req.body /*as IImageData*/

    if(filename.length === 1) {
        res.status(400).json({message: "File not found"})
    }
    
    console.log(filename, path)
    console.log("REQ BODY", req.body)
    // filename.map((eachFile: string)=>{
    //     return url.push(`/${path}/${eachFile}`)
    // })
    return res.status(200).json({url: filename})
}