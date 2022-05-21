import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { InputSearch } from "../../components/inputSearch";
import { Button } from "../../components/Button";
import { apiUrl } from "../../config";

export const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  useEffect(() => {
    fetch(apiUrl + "/email/config")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setName(res.data.name);
          setEmail(res.data.email);
        }
      });
  }, []);

  const updateName = (name) => {
    if (!name) {
      setErrors({
        ...errors,
        name: "Field is required",
      });
    } else if (name.length > 95) {
      setErrors({
        ...errors,
        name: "Field is too long",
      });
    } else {
      delete errors["name"];
      setErrors(errors);
    }

    setName(name);
  };

  const updateEmail = (email) => {
    if (!email) {
      setErrors({
        ...errors,
        email: "Field is required",
      });
    } else if (email.length > 95) {
      setErrors({
        ...errors,
        email: "Field is too long",
      });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrors({
        ...errors,
        email: "Field is invalid",
      });
    } else {
      delete errors["email"];
      setErrors(errors);
    }

    setEmail(email);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    fetch(apiUrl + "/email/config", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast("Config updated", { toastId: "myprofile-success" });
        }
      })
      .catch(() => {
        toast("Something went wrong", {
          toastId: "myprofile-error",
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleEmailForce = () => {
    setIsEmailLoading(true);

    fetch(apiUrl + "/email/force", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast("Email sent", { toastId: "myprofile-email-success" });
        }
      })
      .catch(() => {
        toast("Something went wrong", {
          toastId: "myprofile-email-error",
        });
      })
      .finally(() => setIsEmailLoading(false));
  };

  return (
    <div className="profile">
      <h3 className="title">My profile</h3>

      <div className="name__wrapper">
        <label htmlFor="name">Name</label>
        <InputSearch
          id="name"
          placeholder="Type name..."
          value={name}
          onChange={updateName}
        />
        <p className="name__error">{errors["name"]}</p>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <InputSearch
          id="email"
          placeholder="Type email..."
          value={email}
          onChange={updateEmail}
        />
        <p className="email__error">{errors["email"]}</p>
      </div>

      <Button
        disabled={isLoading || Object.keys(errors).length > 0}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Button disabled={isEmailLoading} onClick={handleEmailForce}>
        Force email
      </Button>
    </div>
  );
};
