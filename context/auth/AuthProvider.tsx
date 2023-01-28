import { FC, useReducer, useEffect, PropsWithChildren } from "react";
// import { useSession, signOut } from "next-auth/react";

import Cookies from "js-cookie";
import axios from "axios";

import { AuthContext, authReducer } from ".";

import { IUser } from "@/interfaces";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async() => {
    try {
      const {data} = await axios.get("/api/user/validate-token");
      const {token, user} = data;

      Cookies.set("token", token);
      dispatch({type: "[Auth] - Login", payload: user})

    } catch (error) {
      Cookies.remove("token")
    }
  }
  
  const loginUser = async(email: string, password: string): Promise<boolean> => {
    try {
      const {data} = await axios.post("/api/user/login", {email, password});
      const {token, user} = data;

      Cookies.set("token", token);
      dispatch({type: "[Auth] - Login", payload: user})
      return true;

    } catch (error) {
      console.log(error)
      return false;
    }
  }

  // const logOut = () => {
    
  // }

  // const { data, status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
  //   }
  // }, [status, data]);

  // const loginUser = async (
  //   email: string,
  //   password: string
  // ): Promise<boolean> => {
  //   try {
  //     const { data } = await axios.post("/api/user/login", { email, password });
  //     const { token, user } = data;
  //     Cookies.set("token", token);
  //     dispatch({ type: "[Auth] - Login", payload: user });
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  // const logOut = () => {
  //   signOut();
  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // Methods
        loginUser,
        // registerUser,
        // logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
