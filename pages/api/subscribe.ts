import type {
	NextApiRequest,
	NextApiResponse,
} from 'next';
import axios from 'axios';
import { db } from '@/database';
import { Subscribe } from '@/models';
import { ISubscribe } from '@/interfaces';
import mailchimp from "@mailchimp/mailchimp_marketing";

// import md5 from 'md5';
// import { validations } from "@/utils";



const API_KEY = process.env.MAILCHIMP_API_KEY;
const API_SERVER = process.env.MAILCHIMP_API_SERVER;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// type Data =
// 	| { message: string }
// 	| ISubscribe
// 	| ({ message: string } & { user: ISubscribe });

mailchimp.setConfig({
  apiKey: API_KEY,
  server: API_SERVER,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse/*<Data>*/
) {
	switch (req.method) {
		case 'POST':
			return subscribeOrUpdateUser(req, res);

		default:
			res
				.status(400)
				.json({ message: 'Bad Request' });
	}
}

const subscribeOrUpdateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const {email} = req.body as ISubscribe;

  if ( !email || !email.length ) {
		return res.status(400).json({ message: 'Email is required' });
	}

  try {
    const responseGet = await mailchimp.lists.getListMember(`${AUDIENCE_ID}`, email);

    if(responseGet?.status === "subscribed"){
      console.log("EL RESPONSE GET", responseGet)
      return res.status(409).json({ message: 'Ya existe un usuario suscripto con ese nombre', response: responseGet });
    } 
    
    if (responseGet?.status === "unsubscribed"){
      console.log("EL RESPONSE UNSUBSCRIBE", responseGet)
      //aca va el metodo put para pasar a subscribed
      const responseUpdate = await mailchimp.lists.updateListMember(
        `${AUDIENCE_ID}`,
        email,
        {status: "subscribed"}
      );
      console.log(responseUpdate);
      return res.status(200).json({message: "Usuario actualizado", user: responseUpdate});
    }
    
  } catch {
    const responsePost = await mailchimp.lists.addListMember(`${AUDIENCE_ID}`, {
      email_address: email,
      status: "subscribed",
    });
    subscribeToDb(email)
    console.log(responsePost);
    if (!responsePost) {
      return res.status(500).json("ERROR DE SERVIDOR")
    }
    return res.status(200).json(responsePost)
    // return res.status(400).json("No funca")
  }
}

const subscribeToDb = async (email: string) => {
  await db.connect();
      const userSubscribeInDB = await Subscribe.findOne({ email: email });
      
      if (userSubscribeInDB?.status === "subscribed") {
        console.log("USER SUBSCRIBED", userSubscribeInDB)
        await db.disconnect();
        return { message: "Ya existe un usuario suscripto con ese nombre"};
      }
  
      const userToSubscribe = new Subscribe({email, status:"subscribed"});
      await userToSubscribe.save();
  
      await db.disconnect();
  
}

const updateSubscribeToDb = async() => {
  // usar .getListMembersInfo("list_id"); para traer todas la lista de miembros en mailchimp
  // traer toda la lista de miembros desde mongo
  // comparar ambas listas para modificar los status
}