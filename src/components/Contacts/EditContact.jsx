import {useContext, useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getContact, updateContact} from "../../services/contactService";
import {Spinner} from "../index";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import {ContactContext} from "../../context/contactContext";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {contactSchema} from "../../validations/contactValidation";
/*import {useImmer} from "use-immer";*/
import {toast} from "react-toastify";

const EditContact = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const {contacts , setContacts,groups, loading, setLoading, setFilteredContacts} = useContext(ContactContext);

    const [contact, setContact] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                setLoading(false);
                setContact(contactData);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    /*const onContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };*/

    const submitForm = async (values) => {
        /*event.preventDefault();*/
        try {
            setLoading(true);
            const { data, status } = await updateContact(values, contactId);
            if (status === 200) {
                setLoading(false);
                toast.success("مخاطب با موفقیت ویرایش شد",{icon: "😶"})
                const allContacts = [...contacts];
                const contactIndex = allContacts.findIndex(c => c.id === parseInt(contactId));
                allContacts[contactIndex] = {...data};
                setContacts(allContacts);

                /*setContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })*/

                setFilteredContacts(allContacts);

                /*setFilteredContacts(draft => {
                    const contactIndex = draft.findIndex(c => c.id === parseInt(contactId));
                    draft[contactIndex] = {...data}
                })*/

                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <Formik initialValues={
                                        {
                                            fullname: contact.fullname,
                                            photo: contact.photo,
                                            mobile: contact.mobile,
                                            email: contact.email,
                                            job: contact.job,
                                            group: contact.group
                                        }
                                    } onSubmit={
                                        values => {
                                            /*console.log(values);*/
                                            submitForm(values);
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
                                                    value="ویرایش مخاطب"
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
                                   {/* <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                name="fullname"
                                                type="text"
                                                className="form-control"
                                                value={contact.fullname}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="نام و نام خانوادگی"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="photo"
                                                type="text"
                                                value={contact.photo}
                                                onChange={onContactChange}
                                                className="form-control"
                                                required={true}
                                                placeholder="آدرس تصویر"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="mobile"
                                                type="number"
                                                className="form-control"
                                                value={contact.mobile}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="شماره موبایل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={contact.email}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="آدرس ایمیل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                value={contact.job}
                                                onChange={onContactChange}
                                                required={true}
                                                placeholder="شغل"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                name="group"
                                                value={contact.group}
                                                onChange={onContactChange}
                                                required={true}
                                                className="form-control"
                                            >
                                                <option value="">انتخاب گروه</option>
                                                {groups.length > 0 &&
                                                    groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="submit"
                                                className="btn"
                                                style={{ backgroundColor: PURPLE }}
                                                value="ویرایش مخاطب"
                                            />
                                            <Link
                                                to={"/contacts"}
                                                className="btn mx-2"
                                                style={{ backgroundColor: COMMENT }}
                                            >
                                                انصراف
                                            </Link>
                                        </div>
                                    </form>*/}
                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${PURPLE}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;
