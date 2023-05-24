import { TextField } from "@mui/material";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  if (!values) {
    return (
      <div>
        <p>ERRO 404</p>
      </div>
    );
  }
  
  return (
    <div className="my-8 mx-0">
      {/* CONTACT INFO */}
      <div>
        <p className="mb-4 text-lg">Contact Info</p>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name}
          name="name"
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
          sx={{ gridColumn: "span 4" }}
        />
      </div>
    </div>
  );
};

export default Payment;
