import React from "react";
import { Backdrop, Box, Fab, Fade, Modal, Stack, TextField } from "@mui/material";
import LoginIconModule from "@mui/icons-material/Login";

const LoginIcon = (LoginIconModule as unknown as { default: typeof LoginIconModule }).default;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  /** HANDLERS **/

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack direction="row" sx={{ width: 800, maxWidth: "95vw", bgcolor: "background.paper", border: "2px solid #000", boxShadow: 5, p: 2 }}>
            <Box component="img" src="/img/auth.webp" alt="camera" sx={{ width: "62%", height: "100%", borderRadius: 2, bgcolor: "#000", mt: 1, ml: 1 }} />
            <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
              <h2>Signup Form</h2>
              <TextField
                sx={{ marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
              />
              <TextField
                sx={{ my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
              />
              <Fab
                sx={{ marginTop: "30px", width: "120px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack direction="row" sx={{ width: 700, maxWidth: "95vw", bgcolor: "background.paper", border: "2px solid #000", boxShadow: 5, p: 2 }}>
            <Box component="img" src="/img/auth.webp" alt="camera" sx={{ width: "62%", height: "100%", borderRadius: 2, bgcolor: "#000", mt: 1, ml: 1 }} />
            <Stack
              sx={{
                marginLeft: "65px",
                marginTop: "25px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px" }}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
              />
              <Fab
                sx={{ marginTop: "27px", width: "120px" }}
                variant={"extended"}
                color={"primary"}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
