export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};
