import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSignin } from "../../api/queries/user.queries";
import useUiStore from "../../store/uiStore";

const SigninForm = ({ switchAuthState }: { switchAuthState: () => void }) => {
  const setAuthModalOpen = useUiStore((s) => s.setAuthModalOpen);
  const signin = useSignin();

  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: (values) => {
      signin.mutate(values, {
        onSuccess: () => {
          signinForm.resetForm();
          setAuthModalOpen(false);
          toast.success("Signed In");
        },
      });
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>
      <Button
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={signin.isPending}
      >
        sign in
      </Button>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>
    </Box>
  );
};

export default SigninForm;
