import React from "react";
import { Button, Input } from "antd";
import validator from "validator";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleUserInput = (e) => {
    if (error) {
      setError(false);
    }
    const { name, value } = e.target;
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (
      validator.isEmpty(formData.name) ||
      !validator.isEmail(formData.email) ||
      !validator.isStrongPassword(formData.password)
    ) {
      setError(true);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid place-items-center">
      <form className="max-w-xl w-full space-y-4 ">
        {error && <p>Please ensure you provide the correct values</p>}
        <Input onChange={handleUserInput} name="name" placeholder="Name" />
        <Input onChange={handleUserInput} name="email" placeholder="Email" />
        <Input
          onChange={handleUserInput}
          name="password"
          placeholder="Password"
        />
        <Button block type="primary" onClick={handleSubmit} loading={loading}>
          Register user
        </Button>
      </form>
    </section>
  );
};

export default Register;
