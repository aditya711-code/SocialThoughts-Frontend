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
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    occupation: user.occupation,
    location: user.location,
    picture: user.picturePath,

  }
  const updateData = (values, onSubmitProps) => {
    console.log("values", values)
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    console.log("FormData", formData)
    axios.patch(`${BASE_URL}/users/${user._id}`, formData, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      const user = response.data;
      if (user) {
        dispatch(
          setLogin({
            user: user,
            token: token,
          })
        );
        toast.success('Updated successfully', { position: "top-right", autoClose: 5000 })
        dispatch(setOpen({ open }))
        // window.location.reload()

      }
    }).catch((err) => {
      toast.error(err.message, { position: "top-right", autoClose: 10000 })
    })


  }
  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("updated function")
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
        <div>
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
              setFieldValue,


            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={style}
                >
                  <UserImage image={user.picturePath} />
                  <Dropzone onDrop={(acceptedFiles) => {
                    setFieldValue("picture", acceptedFiles[0])

                    console.log("picture-value", values.picture)
                  }}>
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
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
        </div>
      </Modal>
    </>
  );
};
export default Settings;
