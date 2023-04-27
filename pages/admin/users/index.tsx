import dynamic from 'next/dynamic';

import { GetServerSideProps } from "next";

import useSWR from "swr";
import { ISubscribe } from "@/interfaces";
import { updateSubscribeToDb } from "@/pages/api/mailchimp/subscribe";

import {MainLayout} from '../../../components/layouts'

const DynamicMainLayout = dynamic(() =>
  import("../../../components/layouts").then((mod) => mod.MainLayout)
);
const DynamicUsersTable= dynamic(() =>
  import("../../../components/admin").then((mod) => mod.UsersTable)
);

export interface dataUsers {
  id: string;
  email: string;
  status: string;
}

const Users = () => {
  const { data, error } = useSWR<ISubscribe[]>("/api/admin/mailchimp/subscribe");

  if (!data && !error) return <></>;

  const dataUsers:dataUsers[] = data!.map((subscribe) => {
    return {
      id: subscribe._id,
      email: subscribe.email,
      status: subscribe.status,
    };
  });

  return (
    <MainLayout
      title="Users-Dashboard"
      metaHeader="Administración de los usuarios"
    >
      <DynamicUsersTable data={dataUsers} />
   
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const usersList = await updateSubscribeToDb();

  return {
    props: {},
  };
};

export default Users;
