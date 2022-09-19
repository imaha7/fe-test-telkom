import React, { useState } from "react";
import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Stack,
  TextField,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormHelperText,
  Divider,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { NextPage } from "next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Search from "@mui/icons-material/Search";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import MailIcon from "@mui/icons-material/Mail";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MapIcon from "@mui/icons-material/Map";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockIcon from "@mui/icons-material/Lock";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import axios from "axios";
import moment from "moment";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const Home: NextPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [data, setData] = React.useState<any>([]);
  const [allData, setAllData] = React.useState<any>([]);

  const [search, setSearch] = React.useState("");
  const [type, setType] = React.useState("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue);
  };

  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleChangePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleHover = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: string
  ) => {
    setType(data);
    event.preventDefault();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (event.target.value !== "") {
      setData(
        data.filter((item: any) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        })
      );
    } else {
      setData(allData);
    }
  };

  const handleSubmit = () => {
    setData([
      ...data,
      {
        name: name,
        email: email,
        date: moment(date).format('DD/MM/YYYY'),
        address: address,
        phone: "+62" + phone,
        password: values.password,
        picture:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      },
    ]);
    setAllData([
      ...allData,
      {
        name: name,
        email: email,
        date: moment(date).format('DD/MM/YYYY'),
        address: address,
        phone: "+62" + phone,
        password: values.password,
        picture:
          "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
      },
    ]);
    console.log({
      name: name,
      email: email,
      date: moment(date).format('DD/MM/YYYY'),
      address: address,
      phone: "+62" + phone,
      password: values.password,
      picture:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
    });
    handleCancel();
  };

  const handleGenerate = () => {
    axios.get("https://randomuser.me/api").then((response) => {
      response.data.results.map((item: any, index: number) => {
        setData([
          ...data,
          {
            name: item.name.title + " " + item.name.first + item.name.last,
            email: item.email,
            date: moment(item.dob.date).format('DD/MM/YYYY'),
            address:
              item.location.street.name +
              " " +
              item.location.street.number +
              ", " +
              item.location.city +
              ", " +
              item.location.state +
              ", " +
              item.location.country +
              ", " +
              item.location.postcode,
            phone: item.phone,
            password: item.login.password,
            picture: item.picture.medium,
          },
        ]);
        setAllData([
          ...allData,
          {
            name: item.name.title + " " + item.name.first + item.name.last,
            email: item.email,
            date: moment(item.dob.date).format('DD/MM/YYYY'),
            address:
              item.location.street.name +
              " " +
              item.location.street.number +
              ", " +
              item.location.city +
              ", " +
              item.location.state +
              ", " +
              item.location.country +
              ", " +
              item.location.postcode,
            phone: item.phone,
            password: item.login.password,
            picture: item.picture.medium,
          },
        ]);
      });
    });

    handleCancel();
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setDate(null);
    setAddress("");
    setPhone("");
    setValues({
      ...values,
      password: "",
    });
  };

  const handleClearList = () => {
    setData([]);
  };

  React.useEffect(() => {}, [data, allData, search, type]);

  return (
    <Box sx={{ mx: 5, my: 3, px: "auto" }}>
      <Typography variant="h5" component="h5" fontWeight={700}>
        Personal Information
      </Typography>
      <Typography variant="subtitle2">
        This information will be displayed publicly so be careful what you
        share.
      </Typography>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Full Name
        </Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          placeholder="Your Name"
          size="small"
          fullWidth
          value={name}
          onChange={handleChangeName}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Email Address
        </Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          placeholder="yourmail@mail.com"
          size="small"
          fullWidth
          value={email}
          onChange={handleChangeEmail}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Date of Birth
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label=""
            inputFormat="MM/DD/YYYY"
            value={date}
            onChange={handleChangeDate}
            renderInput={(params: any) => (
              <TextField {...params} size={"small"} fullWidth />
            )}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Address
        </Typography>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          placeholder="Street Address"
          size="small"
          fullWidth
          multiline
          rows={3}
          value={address}
          onChange={handleChangeAddress}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Phone Number
        </Typography>
        <OutlinedInput
          id="outlined-basic"
          label=""
          placeholder="e.g 813 2811 2993"
          size="small"
          startAdornment={<InputAdornment position="start">+62</InputAdornment>}
          fullWidth
          value={phone}
          onChange={handleChangePhone}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Password
        </Typography>
        <OutlinedInput
          aria-describedby="component-error-password"
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChangePassword("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label=""
          placeholder="*********"
          fullWidth
          size={"small"}
        />
        <FormHelperText id="component-error-password">
          Minimum of 6 characters, with upper & lower case, a number and a
          symbol.
        </FormHelperText>
      </Box>
      <Divider />
      <Box sx={{ my: 2 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Stack direction={"row"} spacing={2}>
              <Button
                variant={"contained"}
                color={"inherit"}
                disableElevation
                onClick={handleCancel}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  border: "1px solid #eeeeee",
                }}
              >
                Cancel
              </Button>
              <Button
                variant={"contained"}
                color={"info"}
                disableElevation
                onClick={handleSubmit}
                sx={{ backgroundColor: "#4F46E5", borderRadius: "5px" }}
              >
                Submit
              </Button>
            </Stack>
          </Grid>
          <Grid
            container
            item
            justifyContent={"flex-end"}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Button
              variant={"contained"}
              color={"inherit"}
              disableElevation
              onClick={handleGenerate}
              sx={{
                backgroundColor: "#E0E7FF",
                color: "#4338CA",
                borderRadius: "5px",
              }}
            >
              Auto Generate
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 2 }}>
        <Stack direction={"row"} justifyContent={"center"} spacing={2}>
          <Divider />
          <Button
            variant={"text"}
            color={"error"}
            disableElevation
            onClick={handleClearList}
          >
            Clear All List User
          </Button>
          <Divider />
        </Stack>
      </Box>
      <Box sx={{ my: 2 }}>
        <OutlinedInput
          id="outlined-basic"
          label=""
          placeholder="Search Keyword ...."
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
          value={search}
          onChange={handleSearch}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        {data.length > 0 ? (
          <Grid container justifyContent={"flex-start"} spacing={2}>
            {data.map((item: any, index: number) => (
              <Grid key={index} item xs={12} sm={12} md={3} lg={3} xl={3}>
                <Card sx={{ minWidth: 275, borderRadius: "5px" }}>
                  <CardContent>
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      spacing={2}
                      sx={{ my: 2 }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={item.picture}
                        sx={{ width: 156, height: 156 }}
                      />
                    </Stack>
                    <Typography
                      align="center"
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Hi My {type} is
                    </Typography>
                    <Typography
                      align="center"
                      sx={{ fontSize: 24 }}
                      color="text.primary"
                      gutterBottom
                    >
                      {(() => {
                        if (type === "email") {
                          return data[index].email;
                        } else if (type === "date") {
                          return data[index].date;
                        } else if (type === "address") {
                          return data[index].address;
                        } else if (type === "phone") {
                          return data[index].phone;
                        } else if (type === "password") {
                          return data[index].password;
                        } else {
                          return data[index].name;
                        }
                      })()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Divider />
                    <Box
                      sx={{
                        width: "100%",
                        borderTop: "1px solid #eeeeee",
                        pt: 2,
                        pb: 1,
                      }}
                    >
                      <Grid
                        container
                        justifyContent={"space-between"}
                        spacing={2}
                      >
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "name");
                            }}
                          >
                            <PersonPinIcon
                              sx={{ "&:hover": { color: "red" } }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "email");
                            }}
                          >
                            <MailIcon sx={{ "&:hover": { color: "red" } }} />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "date");
                            }}
                          >
                            <CalendarTodayIcon
                              sx={{ "&:hover": { color: "red" } }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "address");
                            }}
                          >
                            <MapIcon sx={{ "&:hover": { color: "red" } }} />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "phone");
                            }}
                          >
                            <PhoneIphoneIcon
                              sx={{ "&:hover": { color: "red" } }}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                          <div
                            onMouseOver={(e: any) => {
                              handleHover(e, "password");
                            }}
                          >
                            <LockIcon sx={{ "&:hover": { color: "red" } }} />
                          </div>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Stack direction={"row"} justifyContent={"center"}>
            <Image src="/no-user.png" alt="No User" width={1000} height={256} />
          </Stack>
        )}
      </Box>
    </Box>
    // <div className={styles.container}>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main}>
    //     <h1 className={styles.title}>
    //       Welcome to <a href="https://nextjs.org">Next.js!</a>
    //     </h1>

    //     <p className={styles.description}>
    //       Get started by editing{' '}
    //       <code className={styles.code}>pages/index.tsx</code>
    //     </p>

    //     <div className={styles.grid}>
    //       <a href="https://nextjs.org/docs" className={styles.card}>
    //         <h2>Documentation &rarr;</h2>
    //         <p>Find in-depth information about Next.js features and API.</p>
    //       </a>

    //       <a href="https://nextjs.org/learn" className={styles.card}>
    //         <h2>Learn &rarr;</h2>
    //         <p>Learn about Next.js in an interactive course with quizzes!</p>
    //       </a>

    //       <a
    //         href="https://github.com/vercel/next.js/tree/canary/examples"
    //         className={styles.card}
    //       >
    //         <h2>Examples &rarr;</h2>
    //         <p>Discover and deploy boilerplate example Next.js projects.</p>
    //       </a>

    //       <a
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //       >
    //         <h2>Deploy &rarr;</h2>
    //         <p>
    //           Instantly deploy your Next.js site to a public URL with Vercel.
    //         </p>
    //       </a>
    //     </div>
    //   </main>

    //   <footer className={styles.footer}>
    //     <a
    //       href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Powered by{' '}
    //       <span className={styles.logo}>
    //         <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    //       </span>
    //     </a>
    //   </footer>
    // </div>
  );
};

export default Home;
