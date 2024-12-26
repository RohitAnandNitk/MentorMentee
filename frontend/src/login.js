import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

const Login =()=> {
  const [open, setOpen] = React.useState(false);

  // Toggle the dialog
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      {/* Button to open dialog */}
      <Button onClick={handleOpen}>Sign In</Button>

      {/* Dialog */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            {/* Sign In Header */}
            <Typography variant="h4" color="blue-gray" className="text-center">
              Sign In
            </Typography>

            {/* Description */}
            <Typography
              className="mb-3 font-normal text-center"
              variant="small"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>

            {/* Email Input */}
            <Typography className="text-sm font-medium">Your Email</Typography>
            <Input label="Email" size="lg" />

            {/* Password Input */}
            <Typography className="text-sm font-medium">Your Password</Typography>
            <Input label="Password" size="lg" />

            {/* Remember Me */}
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>

          {/* Footer */}
          <CardFooter className="pt-0">
            {/* Sign In Button */}
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Sign In
            </Button>

            {/* Sign Up Link */}
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?&nbsp;
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="font-bold cursor-pointer"
                onClick={() => {
                  handleOpen(); // Close the dialog
                  alert("Redirecting to Sign Up page..."); // Placeholder action
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default Login;
