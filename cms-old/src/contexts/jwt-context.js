import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { authApi } from "../__fake-api__/auth-api";

var ActionType;
(function (ActionType) {
  ActionType["INITIALIZE"] = "INITIALIZE";
  ActionType["LOGIN"] = "LOGIN";
  ActionType["LOGOUT"] = "LOGOUT";
  ActionType["REGISTER"] = "REGISTER";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: state => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

export const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  me: () => Promise.resolve(),
});

export const AuthProvider = props => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  // const login1 = async (email, password) => {
  //   const accessToken = await authApi.login({ email, password });
  //   const user = await authApi.me(accessToken);

  //   localStorage.setItem("accessToken", accessToken);

  //   dispatch({
  //     type: ActionType.LOGIN,
  //     payload: { user },
  //   });
  // };

  const login = async (email, password) => {
    const response_json = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: email, password, remember: true }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json());

    let { accessToken, user } = response_json;

    localStorage.setItem("accessToken", accessToken);
    dispatch({ type: ActionType.LOGIN, payload: { user } });
  };

  const me = async () => {
    // return new Promise((res, rej) => {
    //   res({
    //     id: "5e86809283e28b96d2d38537",
    //     avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
    //     email: "demo@devias.io",
    //     name: "Anika Visser 123321",
    //     password: "Password123!",
    //     plan: "Premium",
    //   });
    // });
    const profile = await fetch("/api/auth/profile").then(res => res.json());
    console.log({ profile });
    return profile;
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" }).then(res => console.debug({ logout_res: res }));
    localStorage.removeItem("accessToken");
    dispatch({ type: ActionType.LOGOUT });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    // this is from fake api
    const user = await authApi.me(accessToken);

    localStorage.setItem("accessToken", accessToken);

    dispatch({ type: ActionType.REGISTER, payload: { user } });
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = globalThis.localStorage.getItem("accessToken");

        if (accessToken) {
          // const user = await authApi.me(accessToken);
          console.log({ accessToken });
          const user = await me(accessToken);

          dispatch({
            type: ActionType.INITIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          dispatch({
            type: ActionType.INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: ActionType.INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
        register,
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
