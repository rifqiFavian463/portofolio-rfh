type InitiateUserResponse = {
  email: string;
  name: string;
};

type SignInResponse = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
};
