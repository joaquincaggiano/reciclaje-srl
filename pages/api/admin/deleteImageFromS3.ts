import AWS from 'aws-sdk';
import type {
	NextApiRequest,
	NextApiResponse,
} from 'next';

const s3 = new AWS.S3({
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
	region: process.env.AWS_REGION,
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { key } = req.body;
	console.log('EL KEY!!!!', key);

	const params = {
		Bucket: process.env.BUCKET_NAME as string,
		Prefix: key as string,
	};

	const deleteParams = {
		Bucket: process.env.BUCKET_NAME as string,
        Key: key,
        VersionId: dataVersion
	};

	try {
		var dataVersion;
		await s3.listObjectVersions(
			params,
			function (err, data) {
				if (err) {
					console.log('ERROR', err);
				} else {
					console.log('DATA', data);
                    //@ts-ignore
					dataVersion = data.Versions[0];
				}
			}
		);

		//@ts-ignore
		await s3.deleteObject(deleteParams).promise();
		res
			.status(200)
			.json({
				message: 'Image deleted successfully',
			});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Error deleting image' });
	}
}

// const deleteS3Object = async (
//   bucketName: string,
//   filePath: string,
// ): Promise<void> => {
//   const params = {
//     Bucket: bucketName,
//     Key: filePath,
//   };

//   try {
//     const { Versions, DeleteMarkers } = await s3
//       .listObjectVersions(params)
//       .promise();
// console.log("LAS VERSIONS!", Versions)
// console.log("LAS deletemarkers!", DeleteMarkers)

//     const versionsToDelete = Versions!.map((v) => ({
//       Key: v.Key,
//       VersionId: v.VersionId,
//     }));
//     const deleteMarkersToDelete = DeleteMarkers!.map((m) => ({
//       Key: m.Key,
//       VersionId: m.VersionId,
//     }));

//     const deleteParams = {
//       Bucket: bucketName,
//       Delete: {
//         Objects: [...versionsToDelete, ...deleteMarkersToDelete],
//         Quiet: false,
//       },
//     };

//     await s3.deleteObjects(deleteParams).promise();

//     console.log(`Archivo eliminado: ${filePath}`);
//   } catch (error) {
//     console.error(`Error al eliminar el archivo ${filePath}:`, error);
//     throw new Error(`Error al eliminar el archivo ${filePath}: ${error}`);
//   }
// };

// export default deleteS3Object;
