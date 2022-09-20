import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { React, useState } from "react";
import "./Form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCaretRight, AiOutlineCaretLeft, AiOutlineUpload } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import configData from "../../Configs/config.json";
import { auth } from "../Chat/Firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import PreviewImage from "../Posts/CreatePost/PreviewImage";

const Registeration = () => {
    let history = useHistory();

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        description: "",
        gender: "",
        school: "",
        major: "",
        smoker: "",
        pets: "",
        photo: "",
        acceptTerms: false,
    });

    const [currentStep, setCurrentStep] = useState(0);

    const makeRequest = (values) => {
        let data = new FormData();
        var photo = document.getElementById("profile-photo");
        data.append("photo", photo.files[0]);
        data.append("username", values.username);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("description", values.description);
        data.append("school", values.school);
        data.append("major", values.major);
        data.append("pets", values.pets);
        data.append("smoker", values.smoker);
        data.append("gender", values.gender);

        Axios.post(configData.SERVER_URL + "users/registration", data, {
            headers: { "content-type": "multipart/form-data" },
        })
            .then(() => {
                toast.success("Registered Successfully!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
                history.push("/login");
            })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(data);
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };

    const handleNextStep = (newData, final = false) => {
        setData((prev) => ({ ...prev, ...newData }));

        if (final) {
            makeRequest(newData);
            return;
        }

        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }));
        setCurrentStep((prev) => prev - 1);
    };

    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
        <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
    ];

    return <div>{steps[currentStep]}</div>;
};

const stepOneValidationSchema = Yup.object({
    username: Yup.string()
        .min(3, "✖ Username must be at least 3 characters")
        .max(15)
        .required("✖ You must create a Username")
        .matches(/^[a-zA-Z]+/g, "✖ Username must start with a character (a-z or A-Z)"),
    email: Yup.string().required("✖ You must enter an Email").email("✖ Email must be valid"),
    password: Yup.string()
        .required("✖ You must enter a Password")
        .matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[(-/*+!@#$^&*)])/g,
            "✖ Must contain at least 1 upper case letter and 1 number and 1 of the following special characters ( / * - + ! @ # $ ^ & * )."
        )
        .min(5, "✖ Password must be at least 5 characters"),
    password2: Yup.string()
        .required("✖ You must enter a Password")
        .oneOf([Yup.ref("password"), null], "✖ Passwords must match"),
    acceptTerms: Yup.bool().oneOf([true], "✖ You must accept our Terms & Conditions"),
});

const StepOne = (props) => {
    const [fireUser, setFireUser] = useState("");
    const [fireEmail, setFireEmail] = useState("");
    const [firePass, setFirePass] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);

    const handleSubmit = (values) => {
        props.next(values);
        createUserWithEmailAndPassword(auth, fireEmail, firePass)
            .then(() => {
                const userObj = {
                    email: fireEmail,
                    username: fireUser,
                    friends: [],
                    messages: [],
                };
                firebase.firestore().collection("users").doc(fireEmail).set(userObj);
            })
            .catch((error) => {
                toast.error("The Specified Email or Password already exists! Please try again.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    closeButton: false,
                    progress: 0,
                });
                setTimeout(() => window.location.reload(), 4100);
                console.log("That's not good :( ");
                // Error
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
    const style = { marginBottom: "-4px" };

    return (
        <div className="form-container">
            <Formik validationSchema={stepOneValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
                {({ setFieldTouched, handleChange, values }) => (
                    <Form
                        className="reg-card"
                        // autocomplete="off"
                    >
                        <div className="reg-form">
                            <p className="form-heading">Join Us!</p>

                            <Field
                                className="form-input"
                                name="username"
                                placeholder="Enter Your Username"
                                onChange={(e) => {
                                    setFieldTouched("username");
                                    handleChange(e);
                                }}
                                value={setFireUser(values.username)}
                            />
                            <ErrorMessage className="form-error" name="username" component="span" />

                            <Field
                                className="form-input"
                                name="email"
                                placeholder="Enter Your Email"
                                onChange={(e) => {
                                    setFieldTouched("email");
                                    handleChange(e);
                                }}
                                value={setFireEmail(values.email)}
                            />
                            <ErrorMessage className="form-error" name="email" component="span" />
                            <div className="pass-cont">
                                <Field
                                    className="form-input"
                                    type={isShowPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Password"
                                    onChange={(e) => {
                                        setFieldTouched("password");
                                        handleChange(e);
                                    }}
                                    value={setFirePass(values.password)}
                                />
                                <div className="icon-container" onClick={() => setIsShowPassword(!isShowPassword)}>
                                    {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>

                            <ErrorMessage className="form-error" name="password" component="span" />
                            <div className="pass-cont">
                                <Field
                                    className="form-input"
                                    type={isShowPassword2 ? "text" : "password"}
                                    name="password2"
                                    placeholder="Confirm Password"
                                    onChange={(e) => {
                                        setFieldTouched("password2");
                                        handleChange(e);
                                    }}
                                />
                                <div className="icon-container" onClick={() => setIsShowPassword2(!isShowPassword2)}>
                                    {isShowPassword2 ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>
                            <ErrorMessage className="form-error" name="password2" component="span" />

                            <div className="check">
                                <div>
                                    <input
                                        type="checkbox"
                                        name="acceptTerms"
                                        onChange={(e) => {
                                            setFieldTouched("acceptTerms");
                                            handleChange(e);
                                        }}
                                    />
                                    <label for="policy">I accept I am 13+ years of age and I have read and accept the</label>
                                    <a
                                        className="check-link"
                                        href="https://www.termsandcondiitionssample.com/live.php?token=O1d5yb5KfKXEwT534XqbW15fmR2jcZBq"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {" "}
                                        TOS and Privacy Rules.
                                    </a>
                                </div>
                            </div>
                            <ErrorMessage className="form-error" name="acceptTerms" component="span" />

                            <button className="form-input-btn" type="submit">
                                Continue
                                <AiOutlineCaretRight style={style} />
                            </button>

                            <p className="form-input-reg">
                                Already have an account? Login{" "}
                                <Link className="login-link" to="/login">
                                    here.
                                </Link>
                            </p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const stepTwoValidationSchema = Yup.object({
    description: Yup.string().required("✖ You must enter a Description"),
    school: Yup.string().required("✖ You must enter a School"),
    gender: Yup.mixed().required("✖ Select an option"),
    smoker: Yup.mixed().required("✖ Select an option"),
    pets: Yup.mixed().required("✖ Select an option"),
    major: Yup.mixed().required("✖ Select an option"),
});

const StepTwo = (props) => {
    const handleSubmit = (values) => {
        props.next(values);
    };
    const style = { marginBottom: "-4px" };
    return (
        <div className="form-container">
            <Formik validationSchema={stepTwoValidationSchema} initialValues={props.data} onSubmit={handleSubmit}>
                {({ values }) => (
                    <Form className="reg-card">
                        <div className="reg-form">
                            <p className="form-heading">Tell us about yourself!</p>
                            <Field
                                id="textarea"
                                component="textarea"
                                className="form-input"
                                type="text"
                                name="description"
                                placeholder="What are you looking for on this website?"
                            />
                            <ErrorMessage className="form-error" name="description" component="span" />

                            <Field className="form-input" name="school" placeholder="Enter School" />
                            <ErrorMessage className="form-error" name="school" component="span" />

                            <Field component="select" className="form-input-select-reg" name="major">
                                <option value="0">Select a Major</option>
                                <option value="9">Accounting</option>
                                <option value="10">Computer Science</option>
                                <option value="11">Finance</option>
                                <option value="12">Business Management</option>
                                <option value="13">Biology</option>
                                <option value="14">Economics</option>
                                <option value="15">Chinese</option>
                                <option value="16">English</option>
                                <option value="17">Law</option>
                                <option value="18">Physical Science</option>
                            </Field>
                            <ErrorMessage className="form-error" name="major" component="span" />

                            <div className="reg-check" role="group" aria-labelledby="my-radio-group">
                                <Field type="radio" name="gender" value="M" id="gen1" />
                                <label htmlFor="gen1" required>
                                    Male
                                </label>

                                <Field type="radio" name="gender" value="F" id="gen2" />
                                <label htmlFor="gen2" required>
                                    Female
                                </label>

                                <Field type="radio" name="gender" value="N" id="gen3" />
                                <label htmlFor="gen3" required>
                                    Non-Binary
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="gender" component="span" />

                            <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
                                Do you Smoke?
                                <Field type="radio" name="smoker" value="1" id="smok1" />
                                <label htmlFor="smok1" required>
                                    Yes
                                </label>
                                <Field type="radio" name="smoker" value="0" id="smok2" />
                                <label htmlFor="smok2" required>
                                    No
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="smoker" component="span" />

                            <div className="reg-check-pref" role="group" aria-labelledby="my-radio-group">
                                Have any Pets?
                                <Field type="radio" name="pets" value="1" id="pet1" />
                                <label htmlFor="pet1" required>
                                    Yes
                                </label>
                                <Field type="radio" name="pets" value="0" id="pet2" />
                                <label htmlFor="pet2" required>
                                    No
                                </label>
                            </div>
                            <ErrorMessage className="form-error" name="pets" component="span" />

                            <button className="form-input-btn" type="submit">
                                Continue
                                <AiOutlineCaretRight style={style} />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const StepThree = (props) => {
    const handleSubmit = (values) => {
        props.next(values, true);
    };

    const validationSchema = Yup.object().shape({
        photo: Yup.mixed().required("✖ A photo is required"),
    });

    const style = { marginBottom: "-4px" };
    const uploadstyle = { width: "40px", height: "40px", marginBottom: "-12px" };
    return (
        <div className="form-container">
            <Formik validationSchema={validationSchema} initialValues={props.data} onSubmit={handleSubmit}>
                {({ setFieldValue, values }) => (
                    <Form
                        className="reg-card-upload"
                        // autocomplete="off"
                    >
                        <div className="reg-form">
                            <p className="form-heading">Lastly!</p>
                            <div className="upload-image">
                                <ErrorMessage className="form-error" name="photo" component="span" />

                                <label for="profile-photo" className="upload-btn">
                                    <AiOutlineUpload style={uploadstyle} /> Upload a Profile Picture
                                </label>
                                <input
                                    id="profile-photo"
                                    type="file"
                                    name="photo"
                                    accept="image/jpg,image/jpeg,image/png"
                                    onChange={(event) => {
                                        setFieldValue("photo", event.target.files[0]);
                                    }}
                                />
                                {values.photo && <PreviewImage file={values.photo} />}
                            </div>

                            <div className="step-container">
                                <button className="form-input-btn" type="submit" onClick={() => props.prev(values)}>
                                    <AiOutlineCaretLeft style={style} />
                                    Back
                                </button>

                                <button className="form-input-btn" type="submit">
                                    Submit
                                    <AiOutlineCaretRight style={style} />
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Registeration;
