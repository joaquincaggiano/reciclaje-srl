import { MainLayout } from "@/components/layouts";
import { TableComponent } from "@/components/admin";

import { GetServerSideProps } from "next";

import useSWR from "swr";
import { ISubscribe } from "@/interfaces";
import { updateSubscribeToDb } from "@/pages/api/subscribe";


export interface dataUsers {
  id: string;
  email: string;
  status: string;
}

const Users = () => {
  const { data, error } = useSWR<ISubscribe[]>("/api/admin/subscribe");

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
      <TableComponent data={dataUsers} typeS3="users"/>
   
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
