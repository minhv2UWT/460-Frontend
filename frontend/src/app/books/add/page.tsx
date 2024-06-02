"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Input,
} from "@mui/material";
import {addBook} from "@/app/api/routes"

const addNewBook : any = async (theBook: object) => addBook(theBook).then((res: any) => res.json());

const defaultTheme = createTheme();

interface IAlert {
  showAlert: boolean;
  alertMessage: string;
  alertSeverity: string;
}

const EMPTY_ALERT: IAlert = {
  showAlert: false,
  alertMessage: "",
  alertSeverity: "",
};

export default function Send() {
  const [priority, setPriority] = React.useState(1);
  const [alert, setAlert] = React.useState(EMPTY_ALERT);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const data = new FormData(event.currentTarget);
    const formData = new FormData(event.currentTarget);
    const data = {
      isbn13: formData.get("isbn13"),
      authors: formData.get("authors"),
      publication_year: formData.get("publication_year"),
      original_title: formData.get("original_title"),
      title: formData.get("title"),
      rating_avg: "0.0",
      rating_count: "0",
      rating_1_star: "0",
      rating_2_star: "0",
      rating_3_star: "0",
      rating_4_star: "0",
      rating_5_star: "0",
      image_url: "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png",
      image_small_url: "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png"
    };
    console.log(data)
    //addNewBook(JSON.stringify(data))
    addNewBook(data)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert.showAlert && (
        <Alert
          severity={alert.alertSeverity as any}
          onClose={() => setAlert(EMPTY_ALERT)}
        >
          {alert.alertMessage}
        </Alert>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <SendIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add a New Book
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="isbn13"
              label="ISBN"
              name="isbn13"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="authors"
              label="Author(s)"
              id="authors"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="publication_year"
              label="Publication Year"
              id="publication_year"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="original_title"
              label="Original Title"
              id="original_title"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title"
              id="title"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Book
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
