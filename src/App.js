import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(5),
  email: yup.string().required('Please enter email').email(),
});

const content = {
  inputs: [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
  ],
};

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="App">
      <h1>React-hook-form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label className="label">{input.label}</label>
              </p>
              <p>
                <input
                  className="input"
                  type={input.type}
                  {...register(input.name)}
                />
              </p>
              <p className="messages">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
