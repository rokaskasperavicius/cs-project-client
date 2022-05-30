import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { apiUrl } from "../../config";

export const MyProfile = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm();

  const [isEmailLoading, setIsEmailLoading] = useState(false);

  useEffect(() => {
    fetch(apiUrl + "/email/config")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          reset(res.data);
        }
      });
  }, []);

  const onSubmit = (data) => {
    fetch(apiUrl + "/email/config", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast("Config updated", { toastId: "myprofile-success" });
          reset(data);
        } else {
          toast("Something went wrong", {
            toastId: "myprofile-error",
          });
        }
      });
  };

  const handleEmailForce = () => {
    setIsEmailLoading(true);

    fetch(apiUrl + "/email/force", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast("Email sent to " + getValues("email"), {
            toastId: "myprofile-email-success",
          });
        } else {
          toast("Something went wrong", {
            toastId: "myprofile-email-error",
          });
        }
      })
      .finally(() => setIsEmailLoading(false));
  };

  return (
    <div className="profile">
      <h3 className="title">My profile</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 90, message: "Name is too long" },
            })}
            placeholder="Type name..."
            className={errors["name"] ? " error-field" : ""}
          />
          {errors["name"] && <p className="error">{errors["name"]?.message}</p>}
        </div>
        <div>
          <Input
            {...register("email", {
              required: "Email is required",
              maxLength: { value: 90, message: "Email is too long" },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email",
              },
            })}
            placeholder="Type email..."
            className={errors["email"] ? " error-field" : ""}
          />
          {errors["email"] && (
            <p className="error">{errors["email"]?.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting || !isDirty} onClick={handleSubmit}>
          Save
        </Button>

        <Button disabled={isEmailLoading || isDirty} onClick={handleEmailForce}>
          Send test email
        </Button>
      </form>
    </div>
  );
};
