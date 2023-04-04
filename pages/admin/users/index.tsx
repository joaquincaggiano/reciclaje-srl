import { MainLayout } from '@/components/layouts';
import { GetServerSideProps } from 'next';

import {
	DataGrid,
	GridColDef,
} from '@mui/x-data-grid';
import useSWR from 'swr';
import { ISubscribe } from '@/interfaces';
import { Grid } from '@mui/material';
import axios from 'axios';
import { updateSubscribeToDb } from '@/pages/api/subscribe';

const columns: GridColDef[] = [
	{
		field: 'email',
		headerName: 'Email',
		width: 700,
	},
	{
		field: 'status',
		headerName: 'Status',
		width: 700,
	},
];

const Users = () => {
	const { data, error } = useSWR<ISubscribe[]>(
		'/api/admin/subscribe'
	);

	if (!data && !error) return <></>;

	const rows = data!.map((subscribe) => {
		return {
			id: subscribe._id,
			email: subscribe.email,
			status: subscribe.status,
		};
	});

	return (
		<MainLayout
			title='Users-Dashboard'
			metaHeader='Administración de los usuarios'>
			<Grid container className='fadeIn'>
				<Grid
					item
					xs={12}
					sx={{ height: 650, width: '100%' }}>
					<DataGrid
						rows={rows}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Grid>
			</Grid>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps =
	async (ctx) => {
		//get de updateSubscribeToDb() esto va a comparar los users en mongo y en mailchimp
		//actualiza el status de los users para mostrar en el front
		//esto solo hace el llamado a la api (GET O PUT?) para que se actualice una sola vez
		const usersList = await updateSubscribeToDb();
		console.log('usersList', usersList);

		return {
			props: {},
		};
	};

export default Users;
