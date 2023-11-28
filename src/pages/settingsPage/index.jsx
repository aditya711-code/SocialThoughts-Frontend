import { BASE_URL } from "helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Box, TextField, Button, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import UserImage from "components/UserImage";
import { setOpen } from "state";
import { Formik } from "formik";
import { setLogin } from "state";
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Settings = () => {


  const { palette } = useTheme();
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const open = useSelector(state => state.isOpen)
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setOpen({ open }))
  }
  console.log("user", user)
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    occupation: user.occupation,
    location: user.location,
  }
  const updateData = (values, onSubmitProps) => {
    axios.patch(`${BASE_URL}/users/${user._id}`, values, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const user = response.data;
      if (user) {
        console.log("loggedIn", user)
        dispatch(
          setLogin({
            user: user,
            token: token,
          })
        );
        toast.success('Updated successfully', { position: "top-right", autoClose: 5000 })
        dispatch(setOpen({ open }))
        window.location.reload()

      }
    }).catch((err) => {
      toast.error(err.message, { position: "top-right", autoClose: 10000 })
    })


  }
  const handleFormSubmit = async (values, onSubmitProps) => {
    await updateData(values, onSubmitProps)


  }
  return (
    <>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
        >

          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,


          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={style}
              >
                <UserImage image={user.picturePath} />
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  // error={
                  //   Boolean(touched.firstName) && Boolean(errors.firstName)
                  // }
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  // error={
                  //   Boolean(touched.firstName) && Boolean(errors.firstName)
                  // }
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                /><TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  // error={
                  //   Boolean(touched.firstName) && Boolean(errors.firstName)
                  // }
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  // error={
                  //   Boolean(touched.firstName) && Boolean(errors.firstName)
                  // }
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Button

                  type="submit"
                  sx={{

                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Submit
                </Button>
              </Box>

            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default Settings;
