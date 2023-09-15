import {Link} from "react-router-dom";
import {Spinner} from "../";
import {COMMENT, GREEN, PURPLE} from "../../helpers/colors";
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {contactSchema} from "../../validations/contactValidation";

const AddContact = () => {
    const {loading, groups, createContact} = useContext(ContactContext);
    /*const formik = useFormik({
        initialValues : {
            fullname: '',
            photo: '',
            mobile: '',
            email: '',
            job: '',
            group: ''
        },
        validationSchema: contactSchema,
        onSubmit: values => {
            /!*console.log(values);*!/
            createContact(values);
        }
    });*/
    return(
        <>
            {loading ? (<Spinner/>) : (
                <>
                    <section className="p-3">
                        <img
                            alt=""
                            loading="lazy"
                            src={require("../../assets/man-taking-note.png")}
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                left: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 fw-bold text-center" style={{
                                        color: GREEN
                                    }}>
                                        ساخت مخاطب جدید
                                    </p>
                                </div>
                            </div>
                        </div>
                        <hr style={{backgroundColor: GREEN}}/>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                {/*{
                                    errors?.map((error, index) => (
                                        <p key={index} className="text-danger">* {" "}{error.message}</p>
                                    ))
                                }*/}
                                <Formik initialValues={
                                    {
                                        fullname: '',
                                        photo: '',
                                        mobile: '',
                                        email: '',
                                        job: '',
                                        group: ''
                                    }
                                } onSubmit={
                                    values => {
                                        /*console.log(values);*/
                                        createContact(values);
                                    }
                                } validationSchema={contactSchema}>
                                        <Form>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="fullname"*/
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                    /* required={true}*/
                                                    /*value={formik.values.fullname}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    // به جای سه تای بالایی میتوان کد زیر را نوشت که formik خودش همان کار های بالا را انجام میدهد
                                                    /*{...formik.getFieldProps("fullname")}*/
                                                />
                                                {/*{formik.touched.fullname && formik.errors.fullname ? (<div className="text-danger">{formik.errors.fullname}</div>) : null}*/}
                                                <ErrorMessage name="fullname" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="photo"*/
                                                    name="photo"
                                                    type="text"
                                                    className="form-control"
                                                    /* required={true}*/
                                                    placeholder="آدرس تصویر"
                                                    /*value={formik.values.photo}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    /*{...formik.getFieldProps("photo")}*/
                                                />
                                                {/*{formik.touched.photo && formik.errors.photo ? (<div className="text-danger">{formik.errors.photo}</div>) : null}*/}
                                                <ErrorMessage name="photo" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="mobile"*/
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    /*required={true}*/
                                                    placeholder="شماره موبایل"
                                                    /*value={formik.values.mobile}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    /*{...formik.getFieldProps("mobile")}*/
                                                />
                                                {/*{formik.touched.mobile && formik.errors.mobile ? (<div className="text-danger">{formik.errors.mobile}</div>) : null}*/}
                                                <ErrorMessage name="mobile" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="email"*/
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    /*required={true}*/
                                                    placeholder="آدرس ایمیل"
                                                    /*value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    /*{...formik.getFieldProps("email")}*/
                                                />
                                               {/* {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}*/}
                                                <ErrorMessage name="email" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="job"*/
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    /*required={true}*/
                                                    placeholder="شغل"
                                                    /*value={formik.values.job}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    /*{...formik.getFieldProps("job")}*/
                                                />
                                                {/*{formik.touched.job && formik.errors.job ? (<div className="text-danger">{formik.errors.job}</div>) : null}*/}
                                                <ErrorMessage name="job" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    /*id="group"*/
                                                    name="group"
                                                    className="form-control"
                                                    as="select"
                                                    /*required={true}*/
                                                    /*value={formik.values.group}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}*/
                                                    /*{...formik.getFieldProps("group")}*/
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {groups.length > 0 && groups.map((group)=>(
                                                        <option key={group.id} value={group.id}>{group.name}</option>
                                                    ))}
                                                </Field>
                                                {/*{formik.touched.group && formik.errors.group ? (<div className="text-danger" >{formik.errors.group}</div>) : null}*/}
                                                <ErrorMessage name="group" render={msg => (<div className="text-danger">{msg}</div>)}/>
                                            </div>
                                            <div className="mx-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    value="ساخت مخاطب"
                                                    style={{backgroundColor: PURPLE}}
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{backgroundColor: COMMENT}}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>
                                </Formik>

                            </div>
                        </div>
                    </section>
                </>
            )
            }
        </>
    )
}

export default AddContact;