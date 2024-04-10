import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/');
        let passwords = await req.json()
        console.log(passwords);
        setpasswordArray(passwords);
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast.success('📋Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text)
    }

    const togglePass = () => {

        if (ref.current.src.includes("icons/eyehidden.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyehidden.png"
            passwordRef.current.type = "text";
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //if any id exists in the db, delete it
            await fetch('http://localhost:3000/', {
                method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id })
            })

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch('http://localhost:3000/', {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form]);
            setForm({ site: "", username: "", password: "" })
        }
        else {
            toast('Error: Password not saved!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id: ", id);
        setForm({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
        // localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        // console.log([...passwordArray, form]);
    }

    const deletePassword = async (id) => {
        console.log("Deleting password with id: ", id);
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            let res = await fetch('http://localhost:3000/', {
                method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id })
            })
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        // console.log([...passwordArray, form]);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="mycontainer px-2 md:px-2 max-w-full mx-auto">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-700'>Pro/&gt;</span></h1>
                <p className='text-green-700 text-lg text-center max-[500px]:text-sm'>Your dedicated Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-4 mt-4 items-center'>
                    <input value={form.site} onChange={handleChange} name="site" placeholder='Enter website URL' type="text" className='rounded-full border border-green-400 w-full px-4 py-1 text-sm' />
                    <div className="flex md:flex-row flex-col w-full justify-between gap-5">
                        <div className='md:w-2/3'>
                            <input value={form.username} onChange={handleChange} name="username" placeholder='Enter username' type="text" className='rounded-full border border-green-400 w-full px-4 py-1 text-sm' />
                        </div>

                        <div className="relative md:w-1/3">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} name="password" placeholder='Enter password' type="password" className='rounded-full border border-green-400 w-full px-4 pr-6 py-1 text-sm' />
                            <span className='absolute top-[2.5px] right-[3px]'>
                                <img ref={ref} onClick={togglePass} className='p-1 cursor-pointer' width={26} src="icons/eye.png" alt="show pass" />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-4 py-1 w-fit hover:bg-green-400 gap-1 text-sm border border-green-900 text-black font-semibold'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-xl py-4 text-green-800'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-1 text-center w-32 max-[433px]:w-16 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <div>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                            </div>
                                            <div className='lordiconcopy cursor-pointer size-7 max-[433px]:size-4' onClick={() => { copyText(item.site) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3.5px", "paddingLeft": "2px" }} src="https://cdn.lordicon.com/xpgofwru.json" trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center w-32 max-[433px]:w-16 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <div>
                                                {item.username}
                                            </div>
                                            <div className='lordiconcopy cursor-pointer size-7 max-[433px]:size-4' onClick={() => { copyText(item.username) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3.5px", "paddingLeft": "2px" }} src="https://cdn.lordicon.com/xpgofwru.json" trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center w-32 max-[433px]:w-16 border border-white'>
                                        <div className='flex justify-center items-center'>
                                            <div className='font-semibold'>
                                                {"*".repeat(item.password.length)}
                                            </div>
                                            <div className='lordiconcopy cursor-pointer size-7 max-[433px]:size-4' onClick={() => { copyText(item.password) }}>
                                                <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3.5px", "paddingLeft": "2px" }} src="https://cdn.lordicon.com/xpgofwru.json" trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-1 text-center w-7 max-[433px]:w-4 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3.5px", "paddingLeft": "2px" }}
                                                src="https://cdn.lordicon.com/wuvorxbv.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon style={{ "width": "20px", "height": "20px", "paddingTop": "3.5px", "paddingLeft": "2px" }}
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager
