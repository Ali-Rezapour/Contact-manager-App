import './App.css';
import {Navbar,Contacts,ViewContact,AddContact,EditContact} from "./components";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import {useState, useEffect} from "react";
import {createContact, deleteContact, getAllContacts, getAllGroups} from './services/contactService';
import {confirmAlert} from 'react-confirm-alert';
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import {ContactContext} from "./context/contactContext";
import _ from 'lodash';
import {useImmer} from "use-immer";
/*import {ToastContainer, toast} from "react-toastify";*/
import {Toaster, toast} from "react-hot-toast";

const App= () => {
    const [contacts,setContacts]=useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [loading,setLoading]=useState(false);
    const [groups, setGroups]=useState([]);
    /*const [contact,setContact]=useImmer({});*/
    /*const [errors, setErrors] = useState([]);*/
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                setLoading(true);
                const {data : contactsData} = await getAllContacts();
                const {data : groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilteredContacts(contactsData);
                setGroups(groupsData);
                setLoading(false);
            }
            catch (err){
                console.log(err.message);
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    const createContactForm = async (values) => {
        //event.preventDefault();
        try{
            setLoading((prevLoading) => !prevLoading);
            /*setLoading(draft => !draft);*/

            /*await contactSchema.validate(contact, {abortEarly: false});*/

            const {status, data} = await createContact(values);
            if(status===201){
                const allContacts = [...contacts,data];
                setContacts(allContacts);
                setFilteredContacts(allContacts);
                toast.success("مخاطب با موفقیت ساخته شد.",{icon: "🎉"});

                /*setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })*/

                /*setContact({});*/
                /*setErrors([]);*/
                setLoading((prevLoading) => !prevLoading);
                navigate("/contacts");
            }
        }
        catch (err){
            console.log(err.message);
            /*setErrors(err.inner);*/
            setLoading((prevLoading) => !prevLoading);
        }
    }
    /*const onContactChange = (event) =>{
        setContact({
            ...contact,
            [event.target.name] : event.target.value
        });
    }*/

    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return(
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border:`1px solid ${PURPLE}`,
                            borderRadius: "1em"}}
                        className="p-4"
                    >
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}
                        >مطممئن هستم</button>
                        <button onClick={onClose} className="btn" style={{backgroundColor: COMMENT}}>انصراف</button>
                    </div>
                )
            }
        })
    }
    const removeContact =async (contactId) =>{
        //state copy
        const contactsBackup = [...contacts];
        try{
            setLoading(true);
            //delete state
            const updatedContacts = contacts.filter(c => c.id !== contactId);
            setContacts(updatedContacts);
            setFilteredContacts(updatedContacts);

            /*setContacts(draft => {
                draft.filter(c => c.id !== contactId);
            })
            setFilteredContacts(draft => {
                draft.filter(c => c.id !== contactId);
            })*/

            //sending request to server
            const {status} = await deleteContact(contactId);

            toast.error("مخاطب با موفقیت حذف شد",{icon: "🙂"});

            if (status !== 200){
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
                setLoading(false);

            }
            setLoading(false);
        }
        catch (err){
            console.log(err.message);
            setContacts(contactsBackup);
            setFilteredContacts(contactsBackup);
            setLoading(false);
        }
    }
    //let filterTimeout;
    const contactSearch = _.debounce(query => {
        //clearTimeout(filterTimeout);
        if(!query) return setFilteredContacts(contacts);
        //filterTimeout = setTimeout(() => {
            setFilteredContacts(contacts.filter((contact)=>{
                return contact.fullname.toString().toLowerCase().includes(query.toLowerCase());
            }))
        //},1000)
    } , 1000);
  return (
      <ContactContext.Provider value={{
          loading,
          setLoading,
          /*contact,*/
          setContacts,
          setFilteredContacts,
          contacts,
          filteredContacts,
          groups,
          /*errors,*/
          /*onContactChange,*/
          deleteContact: confirmDelete,
          createContact: createContactForm,
          contactSearch
      }}>
          <div className="App">
              {/*<ToastContainer
                  rtl={true}
                  position="top-right"
                  theme="colored"
              />*/}
              <Toaster/>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Navigate to="/contacts"/> }/>
                  <Route path="/contacts" element={<Contacts/>}/>
                  <Route path="/contacts/add" element={<AddContact/>}/>
                  <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                  <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
              </Routes>
          </div>
      </ContactContext.Provider>
  );
}

export default App;
