const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  const url = new URL(`http://localhost:3333/login`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message);
  }

  return response.json();
};

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const getUser = (): DecodedToken | null => {
  const token = localStorage.getItem("@pass-in/token");

  if (!token) return null;

  try {
    // Basic JWT parsing (header.payload.signature)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    localStorage.removeItem("@pass-in/token");
    return null;
  }
};

const isAuthenticated = (): boolean => {
  const user = getUser();
  return !!user;
};

const isAdmin = (): boolean => {
  const user = getUser();
  return user?.role === "ADMIN";
};

const logout = (): void => {
  localStorage.removeItem("@pass-in/token");
  window.location.href = "/";
};

export const User = {
  login,
  getUser,
  isAuthenticated,
  isAdmin,
  logout,
};
