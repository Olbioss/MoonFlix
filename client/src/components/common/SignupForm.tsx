import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSignup } from "../../api/queries/user.queries";
import useUiStore from "../../store/uiStore";

const SignupForm = ({ switchAuthState }: { switchAuthState: () => void }) => {
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);
  const signup = useSignup();

  const signupForm = useFormik({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(5, "username must be at least 5 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password must be at least 8 characters")
        .required("password is required"),
      displayName: Yup.string()
        .min(8, "displayName must be at least 8 characters")
        .required("displayName is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "confirmPassword not match")
        .min(8, "confirmPassword must be at least 8 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: (values) => {
      signup.mutate(values, {
        onSuccess: () => {
          signupForm.resetForm();
          setAuthModalOpen(false);
          toast.success("Sign up success");
        },
      });
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.username &&
            signupForm.errors.username !== undefined
          }
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.displayName &&
            signupForm.errors.displayName !== undefined
          }
          helperText={
            signupForm.touched.displayName && signupForm.errors.displayName
          }
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="primary"
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={signup.isPending}
      >
        sign up
      </Button>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>
    </Box>
  );
};

export default SignupForm;
