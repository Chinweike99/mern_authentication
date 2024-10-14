import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import styles from '../styles/username.module.css'
import { useFormik } from 'formik'
import { Toaster } from 'react-hot-toast'
import {validateProfile } from '../helper/validate'
import { ConvertToBase64 } from '../helper/convert'
import extend from '../styles/Profile.module.css'

const Profile = () => {
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      address: ""
    },
    validate: validateProfile,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile: file || ""}) //Object.assign is javaSript way of adding properties to an object.
      console.log(values)
    }
  })

  /**Formik does not support file uplaod so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await ConvertToBase64(e.target.files[0]);
    setFile(base64)
  }

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder="false"></Toaster>

      <div className='flex justify-center pt-[10rem]  h-screen'>
        <div className={`${styles.glass} ${extend.glass}`} style={{width: "50%"}}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold '>Profile Auth</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              <h3>Welcome</h3>
              <i style={{fontSize: "15px"}}>You can update your details</i>
            </span>
          </div>

          <form className='py-1 ' onSubmit={formik.handleSubmit}>

            <div className='profile flex  justify-center py-4'>
              <label htmlFor='profile'>
                <img className={`${styles.profile_img}`} src={file || assets.female7} alt='avatar'/>
              </label>
              
               <input onChange={onUpload} type='file' id='profile' name='profile'/>
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <div className='name flex gap-10 w-3/4'> 
                <input  {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='First name'/>
                <input  {...formik.getFieldProps('lasttName')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Last name'/>
              </div>
              
              <div className='name flex gap-10 w-3/4'> 
                <input  {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Mobile no'/>
                <input  {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Email address'/>
              </div>
              
                <input  {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type='text' placeholder='Home address'/>
                <button className={styles.btn} type='submit'>Update</button>
            </div>

            <div className='text-center py-4'>
              <span className='text-gray-500'>
                come back later? 
                <Link to='' className='text-red-700'> logout</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile