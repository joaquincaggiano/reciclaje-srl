import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case "GET":
            return getSubscribes(req, res)
    
        default:
            return res.status(400).json({ message: "Bad Request" });
    }
    // res.status(200).json({ message: 'Example' })
}

const getSubscribes = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
}